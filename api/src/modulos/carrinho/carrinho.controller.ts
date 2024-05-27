import { Controller, Get, Post, Body, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CriaCarrinhoDTO } from './dto/CriaCarrinho.dto';
import { AutenticacaoGuard, RequisicaoUsuario } from '../autenticacao/autenticacao.guard';
import { AtualizaCarrinhoDTO } from './dto/AtualizaCarrinho.dto';

@UseGuards(AutenticacaoGuard)
@Controller('carrinho')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) { }

  @Post()
  criarCarrinho(@Req() req: RequisicaoUsuario, @Body() dadosCarrinho: CriaCarrinhoDTO) {
    const usuarioId = req.usuario.sub;
    return this.carrinhoService.criar(usuarioId, dadosCarrinho);
  }

  @Get(':id')
  buscarCarrinho(@Req() req: RequisicaoUsuario) {
    const usuarioId = req.usuario.sub;
    return this.carrinhoService.buscarCarrinho(usuarioId);
  }

  @Patch(':id')
  atualizaCarrinho(@Req() req: RequisicaoUsuario, @Body() dadosCarrinho: AtualizaCarrinhoDTO) {
    const usuarioId = req.usuario.sub;
    return this.carrinhoService.atualizarCarrinho(usuarioId, dadosCarrinho);
  }

  @Delete(':id')
  remove(@Req() req: RequisicaoUsuario) {
    const usuarioId = req.usuario.sub;
    return this.carrinhoService.removerCarrinho(usuarioId);
  }
}
