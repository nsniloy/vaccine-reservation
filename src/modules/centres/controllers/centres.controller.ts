import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CentresService } from '../centres.service';
import { CreateCentreDto } from '../dto/create-centre.dto';
import { UpdateCentreDto } from '../dto/update-centre.dto';

@Controller('centres')
export class CentresController {
  constructor(private readonly centresService: CentresService) {}

  @Post()
  create(@Body() createCentreDto: CreateCentreDto) {
    return this.centresService.create(createCentreDto);
  }

  @Get()
  findAll() {
    return this.centresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCentreDto: UpdateCentreDto) {
    return this.centresService.update(+id, updateCentreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centresService.remove(+id);
  }
}
