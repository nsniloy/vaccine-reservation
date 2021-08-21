import { Injectable } from '@nestjs/common';
import { AssignNurseDto } from '../dto/assign-nurse.dto';
import { CreateCentreDto } from '../dto/create-centre.dto';
import { ISlot } from '../entities/definitions/slot.interface';
import { CentreRepository } from '../repository/definitions/centre.repository.abstract';
import * as moment from 'moment-timezone'
import { SlotRepository } from '../repository/definitions/slot.repository.abstract';
import { NurseHistoryRepository } from '../repository/definitions/nurse-history.repository.abstract';
import { INurseHistory } from '../entities/definitions/nurse-history.interface';
@Injectable()
export class CentreService {
  constructor(
    private readonly centreRepository: CentreRepository,
    private readonly slotRepository: SlotRepository,
    private readonly nurseHistoryRepository: NurseHistoryRepository,
  ) { }
  async create(createCentreDto: CreateCentreDto) {
    return await this.centreRepository.create(createCentreDto);
  }

  async findAll() {
    return await this.centreRepository.findAll();
  }

  async remove(id: string) {
    await this.centreRepository.remove(id);

    //removing unbooked slots for the deleted center
    await this.slotRepository.removeByCentreId(id)
    return
  }

  async assignNurse(assignNurseDto: AssignNurseDto) {
    let centre = await this.centreRepository.findOne(assignNurseDto.centre_id)
    let slots: ISlot[] = this.generateSlots(assignNurseDto, centre.vaccination_duration)
    let created_slots: ISlot[] = await this.slotRepository.createMany(slots)

    //adding nurses to history collection
    await this.nurseHistoryRepository.create({
      centre_id: centre._id,
      centre_name: centre.name,
      ...assignNurseDto
    })
    return {
      slots: created_slots
    }
  }

  async getSlotAndUpdateQuota(centre_id: string, date: Date, session: any) {
    let start_time = moment(date).tz('Asia/Singapore').startOf('day').format()
    let end_time = moment(date).tz('Asia/Singapore').endOf('day').format()
    return await this.slotRepository.reserveSlot(
      centre_id,
      new Date(start_time),
      new Date(end_time),
      session
    )
  }

  async undoSlotBooking(id: string, session: any) {
    await this.slotRepository.increaseQuota(id, 1, session)
  }

  private generateSlots(assignNurseDto: AssignNurseDto, duration: number): ISlot[] {
    let start_time = moment(assignNurseDto.start_time).tz('Asia/Singapore')
    let end_time = moment(assignNurseDto.end_time).tz('Asia/Singapore')
    let { centre_id } = assignNurseDto
    let slots: ISlot[] = []
    while (start_time.isBefore(end_time)) {
      let date = new Date(start_time.format())
      let quota_remaining = assignNurseDto.number_of_nurses
      slots.push({
        date,
        centre_id,
        quota_remaining
      })
      start_time = start_time.add(duration, 'minutes')
    }
    return slots
  }
}
