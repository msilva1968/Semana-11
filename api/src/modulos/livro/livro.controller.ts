import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { CriaLivroDTO } from "./dto/CriaLivro.dto";
import { AtualizaLivroDTO } from "./dto/AtualizaLivro.dto";
import { LivroService } from "./livro.service";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Controller('livro')
export class LivroController {
  constructor(
    private readonly livroService: LivroService,
  ) { }

  @Post()
  async criarLivro(@Body() dadosLivro: CriaLivroDTO) {
    const novoLivro = await this.livroService.criarLivro(dadosLivro);

    return {
      livro: novoLivro,
      messagem: 'Livro criado com sucesso',
    };
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async listaLivros() {
    const listaLivros = await this.livroService.listarLivrosSalvos();
    return listaLivros;
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async buscaPorId(@Param('id') id: string) {
    const livro = await this.livroService.buscarLivroPorId(id);
    return livro;
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosLivro: AtualizaLivroDTO,
  ) {
    const livroAlterado = await this.livroService.atualizarLivro(
      id,
      dadosLivro,
    );

    return {
      mensagem: 'Livro atualizado com sucesso',
      produto: livroAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const livroRemovido = await this.livroService.removerLivro(id);

    return {
      mensagem: 'Livro removido com sucesso',
      produto: livroRemovido,
    };
  }
}