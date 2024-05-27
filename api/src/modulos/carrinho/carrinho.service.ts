import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CriaCarrinhoDTO } from './dto/CriaCarrinho.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CarrinhoEntity } from './carrinho.entity';
import { ItemCarrinhoEntity } from './item-carrinho.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { LivroEntity } from '../livro/livro.entity';

@Injectable()
export class CarrinhoService {
  constructor(
    @Inject(CACHE_MANAGER) private gerenciadorDeCache: Cache,
    @InjectRepository(LivroEntity)
    private readonly livroRepository: Repository<LivroEntity>,
  ) { }

  private trataDadosPedido(dadosCarrinho: CriaCarrinhoDTO, livros: LivroEntity[]) {
    dadosCarrinho.itensCarrinho.forEach((itemCarrinho) => {
      const livro = livros.find((livro) => livro.id === itemCarrinho.livroId);
      if (!livro) {
        throw new NotFoundException(`O livro com o id ${itemCarrinho.livroId} não foi encontrado`);
      }

      if (itemCarrinho.quantidade > livro.quantidadeDisponivel) {
        throw new BadRequestException(`A quantidade solicitada (${itemCarrinho.quantidade}) é maior que a quantidade disponível (${livro.quantidadeDisponivel}) para o livro ${livro.titulo}`);
      }

    })
  }

  async criar(usuarioId: string, dadosCarrinho: CriaCarrinhoDTO) {

    const livrosIds = dadosCarrinho.itensCarrinho.map((itemCarrinho) => itemCarrinho.livroId);

    const livros = await this.livroRepository.findBy({ id: In(livrosIds) });

    this.trataDadosPedido(dadosCarrinho, livros);

    const carrinhoEntity = new CarrinhoEntity();

    const itensCarrinho = dadosCarrinho.itensCarrinho.map((itemCarrinho) => {
      const livro = livros.find((livro) => livro.id === itemCarrinho.livroId);
      const itemCarrinhoEntity = new ItemCarrinhoEntity();

      itemCarrinhoEntity.id = itemCarrinho.livroId;
      itemCarrinhoEntity.precoVenda = livro!.preco;
      itemCarrinhoEntity.quantidade = itemCarrinho.quantidade;

      return itemCarrinhoEntity;
    });

    const valorTotal = itensCarrinho.reduce((total, item) => { return total + item.precoVenda * item.quantidade }, 0);

    carrinhoEntity.id = usuarioId;
    carrinhoEntity.valorTotal = valorTotal;
    carrinhoEntity.itensCarrinho = itensCarrinho;

    const carrinhoAdicionado = { ...carrinhoEntity, usuarioId };
    await this.gerenciadorDeCache.set('carrinho-' + usuarioId, carrinhoAdicionado, 60000);
    return carrinhoAdicionado;
  }

  async buscarCarrinho(id: string): Promise<CarrinhoEntity | null> {
    const data = await this.gerenciadorDeCache.get('carrinho-' + id);
    return data ? JSON.parse(data as string) : null;
  }

  async atualizarCarrinho(idCarrinho: string, dadosCarrinho: CriaCarrinhoDTO) {
    const carrinho = await this.buscarCarrinho(idCarrinho);
    if (!carrinho) {
      throw new Error('Carrinho está vazio.');
    }

    await this.removerCarrinho(idCarrinho);
    await this.criar(idCarrinho, dadosCarrinho);
  }

  async removerCarrinho(idCarrinho: string) {
    await this.gerenciadorDeCache.del('carrinho-' + idCarrinho);
  }
}
