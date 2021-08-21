import { ISlot } from '@modules/centre/entities/definitions/slot.interface';
import { CentreService } from '@modules/centre/services/centre.service';
import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { ReservationFilterDto } from '../dto/reservation-filter.dto';
import * as moment from 'moment-timezone'
import { IReservation } from '../entities/definitions/reservation.interface';
import { ReservationRepository } from '../repository/definitions/reservation.repository.abstract';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { EmailHelper } from 'src/helpers/email.helper';

@Injectable()
export class ReservationService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly centreService: CentreService,
    private readonly repository: ReservationRepository,
    private readonly emailHelper: EmailHelper,
  ) { }
  async create(createReservationDto: CreateReservationDto) {
    if (moment(createReservationDto.date).isBefore(moment().endOf('day'))) {
      throw new BadRequestException('Please select a future date for reservation!')
    }
    let exists = await this.repository.findByNationalId(createReservationDto.national_id)
    if (exists) {
      throw new BadRequestException(
        `You have already taken a reservation on ${moment(createReservationDto.date).format('YYYY-MM-DD')}`
      )
    }
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      let slot: ISlot = await this.centreService.getSlotAndUpdateQuota(
        createReservationDto.centre_id,
        createReservationDto.date,
        session
      )
      if (!slot) {
        session.abortTransaction()
        throw new HttpException({ message: 'No slot available on this date. Please try with another one.' }, HttpStatus.CONFLICT)
      }
      let reservation: IReservation = {
        slot_id: slot._id,
        date: slot.date,
        full_name: createReservationDto.full_name,
        email: createReservationDto.email,
        national_id: createReservationDto.national_id,
        centre_name: createReservationDto.centre_name,
        centre_id: createReservationDto.centre_id
      }
      let created_reservation: IReservation[] = await this.repository.create(reservation, session);
      await session.commitTransaction();
      session.endSession();
      this.sendEmail(created_reservation[0]);
      return created_reservation[0]
    } catch (error) {
      Logger.error(error);
      session.abortTransaction()
      throw new HttpException({ message: 'Could not confirm reservation. Please try again.' }, HttpStatus.CONFLICT)
    }
  }

  async findAll(query: ReservationFilterDto) {
    let start_date = moment(query.start_date).tz('Asia/Singapore').startOf('day').format()
    let end_date = moment(query.end_date).tz('Asia/Singapore').endOf('day').format()
    return await this.repository.findAll(
      new Date(start_date),
      new Date(end_date)
    );
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    let reservation = await this.repository.findOne(id)
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      let slot: ISlot = await this.centreService.getSlotAndUpdateQuota(
        updateReservationDto.centre_id,
        updateReservationDto.date,
        session
      )
      if (!slot) {
        session.abortTransaction()
        throw new HttpException({ message: 'No slot available on the selected date. Please try with another one.' }, HttpStatus.CONFLICT)
      }
      await this.centreService.undoSlotBooking(reservation.slot_id, session);
      let reservation_update: IReservation = {
        slot_id: slot._id,
        date: slot.date,
        centre_name: updateReservationDto.centre_name,
        email: reservation.email,
        centre_id: updateReservationDto.centre_id,
        full_name: reservation.full_name,
        national_id: reservation.national_id
      }
      let updated_reservation: IReservation = await this.repository.update(id, reservation_update, session)
      await session.commitTransaction();
      session.endSession();
      return updated_reservation
    } catch (error) {
      Logger.error(error);
      session.abortTransaction()
      throw new HttpException({ message: 'Could not cancel reservation. Please try again.' }, HttpStatus.CONFLICT)
    }
  }

  async remove(id: string) {
    let reservation = await this.repository.findOne(id)
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.repository.remove(id, session);
      await this.centreService.undoSlotBooking(reservation.slot_id, session);
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      Logger.error(error);
      session.abortTransaction()
      throw new HttpException({ message: 'Could not cancel reservation. Please try again.' }, HttpStatus.CONFLICT)
    }
    return
  }

  private sendEmail(created_reservation: IReservation) {
    let body = `Your vaccine reservation is successful. Please be present in time.<br>
    Name: ${created_reservation.full_name}<br>
    Place: ${created_reservation.centre_name}<br>
    Time: ${moment(created_reservation.date).format('MMMM Do YYYY, h:mm:ss a')}`
    this.emailHelper.sendEmail(
      'niloy.android@gmail.com',
      'Vaccination',
      body
    )
  }
}
