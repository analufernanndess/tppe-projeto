import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsEmail } from 'class-validator';
import { TipoCliente } from '../enum/tipo-cliente.enum';

export class UpdateClienteDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    nome?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    telefone?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    endereco?: string;

    @ApiPropertyOptional({ enum: TipoCliente, description: 'F (física) ou J (jurídica)' })
    @IsOptional()
    @IsEnum(TipoCliente, { message: 'Tipo deve ser F (física) ou J (jurídica)' })
    tipo?: TipoCliente;
}
