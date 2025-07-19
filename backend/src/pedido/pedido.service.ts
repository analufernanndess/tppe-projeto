import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entity/pedido.entity';
import { CreatePedidoDto } from './dto/create.pedido.dto';
import { Cliente } from '../cliente/entity/cliente.entity';
import { Produto } from '../produto/entity/produto.entity';
import { PedidoProduto } from '../pedidos-produtos/entity/pedidos-produtos.entity';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
    @InjectRepository(Produto) private produtoRepo: Repository<Produto>,
    @InjectRepository(PedidoProduto)
    private pedidoProdutoRepo: Repository<PedidoProduto>,
  ) {}

  async create(dto: CreatePedidoDto): Promise<Pedido> {
    const cliente = await this.clienteRepo.findOneBy({ id: dto.clienteId });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    let total = 0;
    const pedido = this.pedidoRepo.create({ cliente, total: 0 });
    await this.pedidoRepo.save(pedido);

    for (const item of dto.produtos) {
      const produto = await this.produtoRepo.findOneBy({ id: item.produtoId });
      if (!produto)
        throw new NotFoundException(
          `Produto ID ${item.produtoId} não encontrado`,
        );

      const subtotal = Number(produto.preco) * item.quantidade;
      total += subtotal;

      const pedidoProduto = this.pedidoProdutoRepo.create({
        pedido,
        produto,
        quantidade: item.quantidade,
      });

      await this.pedidoProdutoRepo.save(pedidoProduto);
    }

    pedido.total = parseFloat(total.toFixed(2));
    return this.pedidoRepo.save(pedido);
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({
      where: { id },
      relations: ['cliente', 'pedidosProdutos', 'pedidosProdutos.produto'],
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }
    return pedido;
  }

  async update(id: number, dto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({ where: { id } });
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }

    const pedidoAtualizado = Object.assign(pedido, dto);
    return this.pedidoRepo.save(pedidoAtualizado);
  }

  async remove(id: number): Promise<void> {
    const result = await this.pedidoRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }
  }
}
