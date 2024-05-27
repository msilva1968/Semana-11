import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { LivroEntity } from '../livro/livro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity, UsuarioEntity, LivroEntity])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule { }
