import { Injectable } from '@nestjs/common';
import { CreateCentreDto } from './dto/create-centre.dto';
import { CentreRepository } from './repository/definitions/centre.repository.abstract';

@Injectable()
export class CentreService {
  constructor(
    private readonly repository: CentreRepository
  ) {}
  async create(createCentreDto: CreateCentreDto) {
    return await this.repository.create(createCentreDto);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async remove(id: string) {
    return await this.repository.remove(id);
  }
}
