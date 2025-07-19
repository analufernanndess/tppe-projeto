import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create.pedido.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@ApiTags('Pedidos')
@Controller('pedido')
export class PedidoController {
  constructor(private readonly service: PedidoService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo pedido' })
  create(@Body() dto: CreatePedidoDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar pedido por ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar pedido por ID' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePedidoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover pedido por ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
