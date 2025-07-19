import { ApiProperty } from '@nestjs/swagger';

export class CreatePessoaFisicaDto {
  @ApiProperty({ example: '123.456.789-00' })
  cpf: string;

  @ApiProperty({ example: 1 })
  clienteId: number;
}
