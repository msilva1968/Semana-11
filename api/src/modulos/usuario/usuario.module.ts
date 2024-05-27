import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEnderecoEntity } from './usuario-endereco.entity';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { EmailUnicoValidator } from './validators/emailUnico.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, UsuarioEnderecoEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService, EmailUnicoValidator],
  exports: [UsuarioService]
})
export class UsuarioModule { }