import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TipoCliente } from '../enum/tipo-cliente.enum';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 20, nullable: true })
  telefone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  endereco: string;

  @Column({ type: 'char' })
  tipo: TipoCliente;
}
