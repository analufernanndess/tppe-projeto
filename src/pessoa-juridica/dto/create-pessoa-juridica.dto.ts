import { IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePessoaJuridicaDto {
    @ApiProperty({ example: '12345678000199', description: 'CNPJ sem máscara' })
    @IsString()
    @Length(14, 14, { message: 'CNPJ deve conter exatamente 14 dígitos numéricos' })
    @Transform(({ value }) => value.replace(/\D/g, ''))
    cnpj: string;

    @ApiProperty({ example: 'Empresa XYZ Ltda.', description: 'Razão social da empresa' })
    @IsString()
    razaoSocial: string;

    @ApiProperty({ example: 1, description: 'ID do cliente vinculado' })
    clienteId: number;
}
