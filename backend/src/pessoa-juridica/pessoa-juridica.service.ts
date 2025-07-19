import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoaJuridica } from './entity/pessoa-juridica.entity';
import { CreatePessoaJuridicaDto } from './dto/create-pessoa-juridica.dto';
import { UpdatePessoaJuridicaDto } from './dto/update-pessoa-juridica.dto';
import { Cliente } from '../cliente/entity/cliente.entity';

@Injectable()
export class PessoaJuridicaService {
  constructor(
    @InjectRepository(PessoaJuridica)
    private readonly pessoaJuridicaRepository: Repository<PessoaJuridica>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(dto: CreatePessoaJuridicaDto): Promise<PessoaJuridica> {
    const cliente = await this.clienteRepository.findOneBy({
      id: dto.clienteId,
    });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    const pessoa = this.pessoaJuridicaRepository.create({
      cnpj: dto.cnpj,
      razaoSocial: dto.razaoSocial,
      cliente,
    });

    return this.pessoaJuridicaRepository.save(pessoa);
  }

  findAll(): Promise<PessoaJuridica[]> {
    return this.pessoaJuridicaRepository.find({ relations: ['cliente'] });
  }

  async findOne(id: number): Promise<PessoaJuridica> {
    const pessoa = await this.pessoaJuridicaRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });
    if (!pessoa) {
      throw new NotFoundException(
        `Pessoa jurídica com ID ${id} não encontrada`,
      );
    }
    return pessoa;
  }

  async update(
    id: number,
    dto: UpdatePessoaJuridicaDto,
  ): Promise<PessoaJuridica> {
    const pessoa = await this.pessoaJuridicaRepository.findOne({
      where: { id },
    });
    if (!pessoa) {
      throw new NotFoundException(
        `Pessoa jurídica com ID ${id} não encontrada`,
      );
    }

    if (dto.clienteId) {
      const cliente = await this.clienteRepository.findOneBy({
        id: dto.clienteId,
      });
      if (!cliente) throw new NotFoundException('Cliente não encontrado');
      pessoa.cliente = cliente;
    }

    const pessoaAtualizada = Object.assign(pessoa, dto);
    return this.pessoaJuridicaRepository.save(pessoaAtualizada);
  }

  async remove(id: number): Promise<void> {
    const result = await this.pessoaJuridicaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Pessoa jurídica com ID ${id} não encontrada`,
      );
    }
  }
}
