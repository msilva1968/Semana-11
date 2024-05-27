import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutorController } from './autor.controller';
import { EmailUnicoValidator } from './validacoes/emailUnico.validator';
import { AutorService } from './autor.service';
import { AutorEntity } from './autor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AutorEntity])],
  controllers: [AutorController],
  providers: [AutorService, EmailUnicoValidator],
})
export class AutorModule { }