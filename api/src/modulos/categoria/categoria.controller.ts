import { Body, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { CriaCategoriaDTO } from "./dto/CriaCategoria.dto";
import { ListaCategoriaDTO } from "./dto/ListaCategoria.dto";
import { CategoriaService } from "./categoria.service";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) { }

  @Post()
  async criar(@Body() dadosCategoria: CriaCategoriaDTO) {

    const novaCategoria = await this.categoriaService.salvarCategoria(dadosCategoria);

    return {
      categoria: new ListaCategoriaDTO(novaCategoria.id, novaCategoria.nome),
      messagem: 'Categoria criada com sucesso',
    };
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async listaCategoria() {
    return await this.categoriaService.listarCategorias();
  }
}