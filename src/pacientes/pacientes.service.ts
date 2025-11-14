
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { User } from '../users/user.entity';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacientesRepository: Repository<Paciente>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto, user: User): Promise<Paciente> {
    const newPaciente = this.pacientesRepository.create({
        ...createPacienteDto,
        user,
    });
    return this.pacientesRepository.save(newPaciente);
  }

  findAll(): Promise<Paciente[]> {
    return this.pacientesRepository.find();
  }

  findOne(id: number): Promise<Paciente | null> {
    return this.pacientesRepository.findOneBy({ PacienteID: id });
  }

  async remove(id: number): Promise<void> {
    await this.pacientesRepository.delete(id);
  }
}
