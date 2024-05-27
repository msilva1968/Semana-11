import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListaAutorDTO } from "./dto/ListaAutor.dto";
import { AutorEntity } from "./autor.entity";
import { In, Repository } from "typeorm";
import { FormatoData } from "../../utils/enums/FormatoData";
import { formatarData } from "../../utils/formatters";
import { CriaAutorDTO } from "./dto/CriaAutor.dto";

@Injectable()
export class AutorService {
  constructor(
    @InjectRepository(AutorEntity)
    private readonly autorRepository: Repository<AutorEntity>
  ) { }

  private async salvar(autorEntity: AutorEntity) {
    return await this.autorRepository.save(autorEntity);
  }

  private async buscarPorId(id: string) {
    const existeAutor = await this.autorRepository.findOneBy({ id });

    if (!existeAutor) {
      throw new Error('Autor não existe');
    }
    return existeAutor;
  }

  async salvarAutor(dadosAutor: CriaAutorDTO) {

    const autorEntity = new AutorEntity();

    autorEntity.nome = dadosAutor.nome;
    autorEntity.email = dadosAutor.email;
    autorEntity.biografia = dadosAutor.biografia;
    autorEntity.dataCadastro = new Date();

    const autorSalvo = await this.salvar(autorEntity);

    return autorSalvo;
  }

  async listarAutores() {
    const autoresSalvos = await this.autorRepository.find();
    const autoresLista = autoresSalvos.map(
      (autor) => new ListaAutorDTO(autor.id, autor.nome, formatarData(autor.dataCadastro, FormatoData.PADRAO)),
    );

    return autoresLista;
  }

  async buscarAutorPorId(id: string) {
    const autor = await this.buscarPorId(id);
    return autor;
  }

  async atualizarAutor(id: string, dadosAutor: Partial<AutorEntity>) {
    const dadosNaoAtualizaveis = ['id', 'usuarioId'];
    const autor = await this.buscarPorId(id);
    Object.entries(dadosAutor).forEach(([chave, valor]) => {
      if (dadosNaoAtualizaveis.includes(chave)) {
        return;
      }
      autor[chave] = valor;
    });

    return await this.salvar(autor);
  }

  async emailExiste(email: string) {
    return this.autorRepository.findOneBy({ email });
  }

  async removerAutor(id: string) {
    return await this.autorRepository.delete(id);
  }

  async buscarAutoresPorIds(ids: string[]): Promise<AutorEntity[]> {
    return await this.autorRepository.find({
      where: {
        id: In(ids)
      }
    });
  }
}