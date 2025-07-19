import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { PessoaFisicaService } from './pessoa-fisica.service';
import { CreatePessoaFisicaDto } from './dto/create-pessoa-fisica.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UpdatePessoaFisicaDto } from './dto/update-pessoa-fisica.dto';

@ApiTags('Pessoa Física')
@Controller('pessoa-fisica')
export class PessoaFisicaController {
  constructor(private readonly pessoaFisicaService: PessoaFisicaService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar pessoa física' })
  create(@Body() dto: CreatePessoaFisicaDto) {
    return this.pessoaFisicaService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as pessoas físicas' })
  findAll() {
    return this.pessoaFisicaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar pessoa física por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pessoaFisicaService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar pessoa física' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePessoaFisicaDto,
  ) {
    return this.pessoaFisicaService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover pessoa física' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pessoaFisicaService.remove(id);
  }
}
