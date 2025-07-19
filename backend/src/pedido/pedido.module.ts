import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entity/pedido.entity';
import { Cliente } from '../cliente/entity/cliente.entity';
import { Produto } from '../produto/entity/produto.entity';
import { PedidoProduto } from '../pedidos-produtos/entity/pedidos-produtos.entity';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Cliente, Produto, PedidoProduto]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
