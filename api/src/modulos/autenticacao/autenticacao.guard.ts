import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UsuarioPayload } from './autenticacao.service';
import { JwtService } from '@nestjs/jwt';

export interface RequisicaoUsuario extends Request {
  usuario: UsuarioPayload;
}

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }
  async canActivate(contexto: ExecutionContext): Promise<boolean> {
    const requisicao = contexto
      .switchToHttp()
      .getRequest<RequisicaoUsuario>();

    const token = await this.extraiToken(requisicao);
    if (!token)
      throw new UnauthorizedException('Erro de autenticação.');

    try {
      const payload: UsuarioPayload = await this.jwtService.verifyAsync<UsuarioPayload>(token);
      requisicao.usuario = payload;
    } catch (error) {
      throw new UnauthorizedException('JWT inválido.');
    }
    return true;
  }

  private async extraiToken(requisicao: Request): Promise<string | undefined> {
    const [tipo, token] = requisicao.headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined;
  }
}