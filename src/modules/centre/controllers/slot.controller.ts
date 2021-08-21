import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SlotFilterDto } from '../dto/slot-filter.dto';
import { SlotService } from '../services/slot.service';

@ApiTags('Slot')
@Controller('slot')
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @Get()
  @ApiOperation({ description: 'Shows all slots of a company between a date range' })
  async findByCentreId(@Query() filter: SlotFilterDto) {
    return await this.slotService.findByCentreId(filter);
  }
}
