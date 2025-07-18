import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaFisica } from './entity/pessoa-fisica.entity';
import { PessoaFisicaService } from './pessoa-fisica.service';
import { PessoaFisicaController } from './pessoa-fisica.controller';
import { Cliente } from '../cliente/entity/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PessoaFisica, Cliente])],
  controllers: [PessoaFisicaController],
  providers: [PessoaFisicaService],
})
export class PessoaFisicaModule {}