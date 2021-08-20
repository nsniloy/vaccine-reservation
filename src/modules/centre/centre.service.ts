import { Injectable } from '@nestjs/common';
import { AssignNurseDto } from './dto/assign-nurse.dto';
import { CreateCentreDto } from './dto/create-centre.dto';
import { ISlot } from './entities/definitions/slot.interface';
import { CentreRepository } from './repository/definitions/centre.repository.abstract';
import * as moment from 'moment'
import { SlotRepository } from './repository/definitions/slot.repository.abstract';
import { NurseHistoryRepository } from './repository/definitions/nurse-history.repository.abstract';
import { INurseHistory } from './entities/definitions/nurse-history.interface';
@Injectable()
export class CentreService {
  constructor(
    private readonly centreRepository: CentreRepository,
    private readonly slotRepository: SlotRepository,
    private readonly nurseRepository: NurseHistoryRepository,
  ) { }
  async create(createCentreDto: CreateCentreDto) {
    return await this.centreRepository.create(createCentreDto);
  }

  async findAll() {
    return await this.centreRepository.findAll();
  }

  async remove(id: string) {
    return await this.centreRepository.remove(id);
  }

  async assignNurse(assignNurseDto: AssignNurseDto) {
    let centre = await this.centreRepository.findOne(assignNurseDto.centre_id)
    let slots:ISlot[] = this.generateSlots(assignNurseDto, centre._id)
    let created_slots: ISlot[] = await this.slotRepository.createMany(slots)

    //adding nurses to history collection
    await this.nurseRepository.create(assignNurseDto)
    return created_slots
  }

  private generateSlots(assignNurseDto: AssignNurseDto, duration: number): ISlot[] {
    let start_time = moment(assignNurseDto.start_time)
    let end_time = moment(assignNurseDto.end_time)
    let { centre_id } = assignNurseDto
    let slots: ISlot[] = []
    while (start_time.isBefore(end_time)) {
      let time = new Date(start_time.format())
      slots.push({
        time,
        centre_id
      })
      start_time = start_time.add(duration)
    }
    return slots
  }
}
