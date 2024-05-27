import { Module } from '@nestjs/common';
import { LivroController } from './livro.controller';
import { ISBNUnicoValidator } from './validators/isbnUnico.validator';
import { AutorService } from '../autor/autor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutorEntity } from '../autor/autor.entity';
import { LivroService } from './livro.service';
import { LivroEntity } from './livro.entity';
import { CategoriaService } from '../categoria/categoria.service';
import { CategoriaEntity } from '../categoria/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AutorEntity, LivroEntity, CategoriaEntity])],
  controllers: [LivroController],
  providers: [LivroService, AutorService, CategoriaService, ISBNUnicoValidator],
})
export class LivroModule { }