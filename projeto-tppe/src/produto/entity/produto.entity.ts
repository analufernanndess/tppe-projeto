import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PedidoProduto } from '../../pedidos-produtos/entity/pedidos-produtos.entity';

@Entity('produtos')
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    nome: string;

    @Column({ type: 'numeric' })
    preco: number;

    @OneToMany(() => PedidoProduto, pedidoProduto => pedidoProduto.produto)
    pedidosProdutos: PedidoProduto[];
}
