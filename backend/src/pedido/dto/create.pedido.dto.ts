import { ApiProperty } from '@nestjs/swagger';

export class CreatePedidoDto {
  @ApiProperty()
  clienteId: number;

  @ApiProperty({ example: [{ produtoId: 1, quantidade: 2 }] })
  produtos: { produtoId: number; quantidade: number }[];
}
