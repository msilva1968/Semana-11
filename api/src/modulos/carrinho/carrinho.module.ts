import { Module } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoController } from './carrinho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivroEntity } from '../livro/livro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LivroEntity])],
  controllers: [CarrinhoController],
  providers: [CarrinhoService],
})
export class CarrinhoModule { }
