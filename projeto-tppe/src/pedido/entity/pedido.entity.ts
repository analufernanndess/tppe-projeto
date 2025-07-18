import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    OneToMany, JoinColumn,
} from 'typeorm';
import { Cliente } from '../../cliente/entity/cliente.entity';
import { PedidoProduto } from '../../pedidos-produtos/entity/pedidos-produtos.entity';

@Entity('pedidos')
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cliente, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;

    @CreateDateColumn()
    data: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @OneToMany(() => PedidoProduto, pedidoProduto => pedidoProduto.pedido, { cascade: true })
    pedidosProdutos: PedidoProduto[];

}