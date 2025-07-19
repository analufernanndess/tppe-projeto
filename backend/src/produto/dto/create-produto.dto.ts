import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNumber()
  preco: number;
}
