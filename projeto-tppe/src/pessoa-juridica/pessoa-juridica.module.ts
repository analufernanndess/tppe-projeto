import { Module } from '@nestjs/common';
import { PessoaJuridicaService } from './pessoa-juridica.service';
import { PessoaJuridicaController } from './pessoa-juridica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaJuridica } from './entity/pessoa-juridica.entity';
import { Cliente } from '../cliente/entity/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PessoaJuridica, Cliente])],
  controllers: [PessoaJuridicaController],
  providers: [PessoaJuridicaService],
})
export class PessoaJuridicaModule {}
