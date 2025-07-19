import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoaFisica } from './entity/pessoa-fisica.entity';
import { CreatePessoaFisicaDto } from './dto/create-pessoa-fisica.dto';
import { Cliente } from '../cliente/entity/cliente.entity';
import { UpdatePessoaFisicaDto } from './dto/update-pessoa-fisica.dto';

@Injectable()
export class PessoaFisicaService {
  constructor(
    @InjectRepository(PessoaFisica)
    private readonly pessoaFisicaRepository: Repository<PessoaFisica>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(dto: CreatePessoaFisicaDto): Promise<PessoaFisica> {
    const cliente = await this.clienteRepository.findOneBy({
      id: dto.clienteId,
    });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const novaPessoa = this.pessoaFisicaRepository.create({ ...dto, cliente });
    return this.pessoaFisicaRepository.save(novaPessoa);
  }

  findAll(): Promise<PessoaFisica[]> {
    return this.pessoaFisicaRepository.find();
  }

  async findOne(id: number): Promise<PessoaFisica> {
    const pessoa = await this.pessoaFisicaRepository.findOne({ where: { id } });
    if (!pessoa) {
      throw new NotFoundException(`Pessoa Física com ID ${id} não encontrada`);
    }
    return pessoa;
  }

  async update(id: number, dto: UpdatePessoaFisicaDto): Promise<PessoaFisica> {
    const pessoa = await this.pessoaFisicaRepository.findOneBy({ id });
    if (!pessoa) {
      throw new NotFoundException('Pessoa física não encontrada');
    }

    const atualizada = Object.assign(pessoa, dto);
    return this.pessoaFisicaRepository.save(atualizada);
  }

  async remove(id: number): Promise<void> {
    const result = await this.pessoaFisicaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pessoa Física com ID ${id} não encontrada`);
    }
  }
}
