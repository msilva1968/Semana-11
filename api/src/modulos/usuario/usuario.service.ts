import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { UsuarioEnderecoEntity } from "./usuario-endereco.entity";
import { CriarUsuarioDTO } from "./dto/CriarUsuario.dto";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizarUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>
  ) { }

  private async salvar(usuarioEntity: UsuarioEntity) {
    return await this.usuarioRepository.save(usuarioEntity);
  }

  private async buscarPorId(id: string) {
    const existeUsuario = await this.usuarioRepository.findOneBy({ id });

    if (!existeUsuario) {
      throw new Error('Usuario não existe');
    }
    return existeUsuario;
  }

  async salvarUsuario(dadosUsuario: CriarUsuarioDTO) {
    const usuario = new UsuarioEntity();
    Object.assign(usuario, dadosUsuario as UsuarioEntity);

    const enderecos = dadosUsuario.enderecos.map(endereco => {
      const enderecoEntity = new UsuarioEnderecoEntity();
      Object.assign(enderecoEntity, endereco as UsuarioEnderecoEntity);
      return enderecoEntity;
    });

    usuario.enderecos = enderecos;

    return await this.salvar(usuario);
  }

  async emailExiste(email: string) {
    return this.usuarioRepository.findOneBy({ email });
  }

  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (checkEmail === null)
      throw new NotFoundException('O email não foi encontrado.');

    return checkEmail;
  }

  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome, usuario.email),
    );
    return usuariosLista;
  }

  async atualizaUsuario(id: string, novosDados: AtualizarUsuarioDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null)
      throw new NotFoundException('O usuário não foi encontrado.');

    Object.assign(usuario, novosDados as UsuarioEntity);

    return this.usuarioRepository.save(usuario);
  }

  async deletaUsuario(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException('O usuário não foi encontrado');
    }

    await this.usuarioRepository.delete(usuario.id);

    return usuario;
  }

}