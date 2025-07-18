import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../../cliente/entity/cliente.entity';

@Entity('pessoas_fisicas')
export class PessoaFisica {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    cpf: string;


    @OneToOne(() => Cliente, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;
}
