import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone'
import { SlotFilterDto } from '../dto/slot-filter.dto';
import { NurseHistoryRepository } from '../repository/definitions/nurse-history.repository.abstract';
@Injectable()
export class HistoryService {
  constructor(
    private readonly historyRepository: NurseHistoryRepository
  ) { }
  async findByCentreId(filter: SlotFilterDto) {
    filter.start_date = moment(filter.start_date).startOf('day').toDate()
    filter.end_date = moment(filter.end_date).startOf('day').toDate()
    return await this.historyRepository.findByCentreId(filter);
  }
}
