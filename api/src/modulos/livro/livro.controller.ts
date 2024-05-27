import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { CriaLivroDTO } from "./dto/CriaLivro.dto";
import { AtualizaLivroDTO } from "./dto/AtualizaLivro.dto";
import { AutorService } from "../autor/autor.service";
import { CategoriaService } from "../categoria/categoria.service";
import { LivroService } from "./livro.service";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Controller('livro')
export class LivroController {
  constructor(
    private readonly livroService: LivroService,
    private readonly categoriaService: CategoriaService,
    private readonly autorService: AutorService
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