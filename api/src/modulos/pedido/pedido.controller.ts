import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AutenticacaoGuard, RequisicaoUsuario } from '../autenticacao/autenticacao.guard';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';

@UseGuards(AutenticacaoGuard)
@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) { }

  @Post()
  async criaPedido(@Req() req: RequisicaoUsuario, @Body() dadosPedido: CriaPedidoDTO) {
    const usuarioId = req.usuario.sub;
    const pedidoCriado = await this.pedidoService.cadastrarPedido(usuarioId, dadosPedido);
    return pedidoCriado;
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async obtemPedidosDeUsuario(@Req() req: RequisicaoUsuario) {
    const usuarioId = req.usuario.sub;
    const pedidos = await this.pedidoService.obtemPedidosDeUsuario(usuarioId);
    return {
      mensagem: 'Pedidos obtidos com sucesso.',
      pedidos,
    };
  }

  @Patch(':id')
  async atualizaPedido(
    @Req() req: RequisicaoUsuario,
    @Param('id') pedidoId: string,
    @Body() dadosDeAtualizacao: AtualizaPedidoDto,
  ) {
    const usuarioId = req.usuario.sub;
    const pedidoAtualizado = await this.pedidoService.atualizaPedido(
      pedidoId,
      dadosDeAtualizacao,
      usuarioId,
    );
    return pedidoAtualizado;
  }

}
