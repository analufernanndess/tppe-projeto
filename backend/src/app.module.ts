import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { PessoaFisicaModule } from './pessoa-fisica/pessoa-fisica.module';
import { PessoaJuridicaModule } from './pessoa-juridica/pessoa-juridica.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // cuidado com isso em prod
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),

    ClienteModule,
    PessoaFisicaModule,
    PessoaJuridicaModule,
    ProdutoModule,
    PedidoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
