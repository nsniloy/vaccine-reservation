import { ISlot } from '../../centre/entities/definitions/slot.interface';
import { CentreService } from '../../centre/services/centre.service';
import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { ReservationFilterDto } from '../dto/reservation-filter.dto';
import * as moment from 'moment-timezone'
import { IReservation } from '../entities/definitions/reservation.interface';
import { ReservationRepository } from '../repository/definitions/reservation.repository.abstract';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { EmailHelper } from '../../../helpers/email.helper';
import { SlotService } from '../../centre/services/slot.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly centreService: CentreService,
    private readonly slotService: SlotService,
    private readonly repository: ReservationRepository,
    private readonly emailHelper: EmailHelper,
  ) { }
  async create(createReservationDto: CreateReservationDto) {
    if (moment(createReservationDto.date).isBefore(moment().endOf('day'))) {
      throw new BadRequestException('Please select a future date for reservation!')
    }
    let reservation_exists = await this.repository.findByNationalId(createReservationDto.national_id)
    if (reservation_exists) {
      throw new BadRequestException(
        `You have already taken a reservation on ${moment(createReservationDto.date).format('YYYY-MM-DD')}`
      )
    }
    let start_date = moment(createReservationDto.date).startOf('day').toDate()
    let end_date = moment(createReservationDto.date).endOf('day').toDate()
    let slot_exists: boolean = await this.slotService.checkIfExists({
      centre_id: createReservationDto.centre_id,
      start_date: start_date,
      end_date: end_date
    })
    if (!slot_exists) {
      throw new BadRequestException(
        `No slot available on ${start_date}. Please try with another one`
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
    let start_date = moment(query.start_date).startOf('day').toDate()
    let end_date = moment(query.end_date).endOf('day').toDate()
    return await this.repository.findAll(
      start_date,
      end_date,
      query.centre_id
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
