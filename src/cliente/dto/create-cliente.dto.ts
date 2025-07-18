import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { TipoCliente } from '../enum/tipo-cliente.enum';

export class CreateClienteDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    telefone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    endereco: string;

    @ApiProperty({ enum: TipoCliente, description: 'F (física) ou J (jurídica)' })
    @IsEnum(TipoCliente, { message: 'Tipo deve ser F (física) ou J (jurídica)' })
    tipo: TipoCliente;
}
