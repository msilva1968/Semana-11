import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequisicaoUsuario } from '../../../modulos/autenticacao/autenticacao.guard';
import { Request, Response } from 'express';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private readonly logger: ConsoleLogger) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextoHttp = context.switchToHttp();
    const requisicao = contextoHttp.getRequest<Request | RequisicaoUsuario>();
    const response = contextoHttp.getResponse<Response>();

    const { path, method } = requisicao;
    const { statusCode } = response;
    const instantePreControlador = Date.now();

    this.logger.log(`Rota ${method} ${path} acessada.`);

    return next.handle().pipe(
      tap(() => {
        if ('usuario' in requisicao) {
          this.logger.log(`Rota acessada pelo usuário ${requisicao.usuario.sub}`);
        }
        const tempoDeResposta = Date.now() - instantePreControlador;
        this.logger.log(`Rota ${method} ${path} finalizada com status ${statusCode} em ${tempoDeResposta}ms.`);
      })
    );
  }
}
