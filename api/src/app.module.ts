import { ClassSerializerInterceptor, ConsoleLogger, Module } from '@nestjs/common';
import { AutorModule } from './modulos/autor/autor.module';
import { LivroModule } from './modulos/livro/livro.module';
import { CategoriaModule } from './modulos/categoria/categoria.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { PedidoModule } from './modulos/pedido/pedido.module';
import { FiltroDeExcecaoGlobal } from './utils/filtros/filtro-de-excecao-global';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AutenticacaoModule } from './modulos/autenticacao/autenticacao.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerGlobalInterceptor } from './utils/interceptores/logger-global/logger-global.interceptor';
import { CarrinhoModule } from './modulos/carrinho/carrinho.module';

@Module({
  imports: [
    AutorModule,
    LivroModule,
    CategoriaModule,
    UsuarioModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DBConfigService,
      inject: [DBConfigService],
    }),
    PedidoModule,
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({ ttl: 10 * 1000 })
      }),
      isGlobal: true
    }),
    AutenticacaoModule,
    CarrinhoModule,
  ],
  providers: [{
    provide: APP_FILTER,
    useClass: FiltroDeExcecaoGlobal,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggerGlobalInterceptor,
  },
    ConsoleLogger,
  ],
})
export class AppModule { }
