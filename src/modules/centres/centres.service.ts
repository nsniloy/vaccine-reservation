import { Injectable } from '@nestjs/common';
import { CreateCentreDto } from './dto/create-centre.dto';
import { UpdateCentreDto } from './dto/update-centre.dto';

@Injectable()
export class CentresService {
  create(createCentreDto: CreateCentreDto) {
    return 'This action adds a new centre';
  }

  findAll() {
    return `This action returns all centres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} centre`;
  }

  update(id: number, updateCentreDto: UpdateCentreDto) {
    return `This action updates a #${id} centre`;
  }

  remove(id: number) {
    return `This action removes a #${id} centre`;
  }
}
