import { Module } from '@nestjs/common';
import { LivroController } from './livro.controller';
import { ISBNUnicoValidator } from './validators/isbnUnico.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivroService } from './livro.service';
import { LivroEntity } from './livro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LivroEntity])],
  controllers: [LivroController],
  providers: [LivroService, ISBNUnicoValidator],
})
export class LivroModule { }