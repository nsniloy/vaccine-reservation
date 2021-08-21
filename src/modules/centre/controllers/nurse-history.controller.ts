import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HistoryFilterDto } from '../dto/history-filter.dto';
import { HistoryService } from '../services/history.service';

@ApiTags('Nurse History')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  
  @Get()
  @ApiOperation({ description: 'Shows all slots of a company between a date range' })
  async findByCentreId(@Query() filter: HistoryFilterDto) {
    return await this.historyService.findByCentreId(filter);
  }
  
}
