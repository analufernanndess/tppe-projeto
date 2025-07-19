import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from '../../cliente/entity/cliente.entity';

@Entity('pessoas_juridicas')
export class PessoaJuridica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  razaoSocial: string;

  @OneToOne(() => Cliente, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;
}
