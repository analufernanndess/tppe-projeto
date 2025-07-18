import {Controller, Post, Get, Body, Param, ParseIntPipe, Put, Delete} from '@nestjs/common';
import { PessoaJuridicaService } from './pessoa-juridica.service';
import { CreatePessoaJuridicaDto } from './dto/create-pessoa-juridica.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Pessoa Jurídica')
@Controller('pessoa-juridica')
export class PessoaJuridicaController {
    constructor(private readonly pessoaJuridicaService: PessoaJuridicaService) {}

    @Post()
    @ApiOperation({ summary: 'Cadastrar pessoa jurídica' })
    create(@Body() dto: CreatePessoaJuridicaDto) {
        return this.pessoaJuridicaService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas as pessoas jurídicas' })
    findAll() {
        return this.pessoaJuridicaService.findAll();
    }
    @Get(':id')
    @ApiOperation({ summary: 'Buscar pessoa jurídica por ID' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.pessoaJuridicaService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar pessoa jurídica' })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreatePessoaJuridicaDto) {
        return this.pessoaJuridicaService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remover pessoa jurídica' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.pessoaJuridicaService.remove(id);
    }
}
