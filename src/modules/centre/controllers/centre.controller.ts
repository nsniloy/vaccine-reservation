import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CentreService } from '../services/centre.service';
import { AssignNurseDto } from '../dto/assign-nurse.dto';
import { CreateCentreDto } from '../dto/create-centre.dto';

@ApiTags('Centre')
@Controller('centre')
export class CentreController {
  constructor(private readonly centreService: CentreService) {}

  @Post()
  @ApiOperation({ description: 'Creates a centre.' })
  async create(@Body() createCentreDto: CreateCentreDto) {
    return {
      data: await this.centreService.create(createCentreDto),
      message: 'Centre created successfully!'
    }
  }

  @Get()
  @ApiOperation({ description: 'Shows all centres' })
  async findAll() {
    return await this.centreService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ description: 'Deletes a centre.' })
  async remove(@Param('id') id: string) {
    await this.centreService.remove(id);
    return {
      message: 'Centre deleted successfully'
    }
  }

  @Post('assign-nurse')
  @ApiOperation({ description: 'Adds nurse to a centre for a particular date.' })
  async assignNurse(@Body() assignNurseDto: AssignNurseDto) {
    return {
      ...await this.centreService.assignNurse(assignNurseDto),
      message: 'Nurse assigned successfully!'
    }
  }
}
