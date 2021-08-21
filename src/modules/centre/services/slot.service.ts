import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone'
import { SlotRepository } from '../repository/definitions/slot.repository.abstract';
import { SlotFilterDto } from '../dto/slot-filter.dto';
@Injectable()
export class SlotService {
  constructor(
    private readonly slotRepository: SlotRepository
  ) { }
  async findByCentreId(filter: SlotFilterDto) {
    filter.start_date = moment(filter.start_date).startOf('day').toDate()
    filter.end_date = moment(filter.end_date).startOf('day').toDate()
    return await this.slotRepository.findByCentreId(filter);
  }
}
