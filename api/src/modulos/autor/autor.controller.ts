import { Body, Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { ListaAutorDTO } from "./dto/ListaAutor.dto";
import { CriaAutorDTO } from "./dto/CriaAutor.dto";
import { FormatoData } from "../../utils/enums/formatoData";
import { formatarData } from "../../utils/formatters";
import { AutorService } from "./autor.service";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Controller('autor')
export class AutorController {
  constructor(
    private readonly autorService: AutorService
  ) { }

  @Post()
  async criar(@Body() dadosAutor: CriaAutorDTO) {

    const autorSalvo = await this.autorService.salvarAutor(dadosAutor);

    return {
      usuario: new ListaAutorDTO(autorSalvo.id, autorSalvo.nome, formatarData(autorSalvo.dataCadastro, FormatoData.PADRAO)),
      messagem: 'Autor criado com sucesso',
    };
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async listAutores() {
    const autoresSalvos = await this.autorService.listarAutores();
    return autoresSalvos;
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async buscaPorId(@Param('id') id: string) {
    return await this.autorService.buscarAutorPorId(id);
  }
}