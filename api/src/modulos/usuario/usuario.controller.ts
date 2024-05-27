import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CriarUsuarioDTO } from "./dto/CriarUsuario.dto";
import { UsuarioService } from "./usuario.service";
import { HashearSenhaPipe } from "../../utils/pipes/hashear-senha.pipe";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizarUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  async criaUsuario(
    @Body() { senha, ...dadosUsuario }: CriarUsuarioDTO,
    @Body('senha', HashearSenhaPipe) senhaHasheada: string,
  ) {
    const usuarioCriado = await this.usuarioService.salvarUsuario({
      ...dadosUsuario,
      senha: senhaHasheada,
    });

    return {
      mensagem: 'Usuário criado com sucesso',
      usuario: new ListaUsuarioDTO(usuarioCriado.id, usuarioCriado.nome, usuarioCriado.email)
    }
  }

  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioService.listUsuarios();

    return {
      mensagem: 'Usuários obtidos com sucesso.',
      usuarios: usuariosSalvos,
    };
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizarUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
      id,
      novosDados,
    );

    return {
      messagem: 'usuário atualizado com sucesso',
      usuario: usuarioAtualizado,
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

    return {
      messagem: 'usuário removido com suceso',
      usuario: usuarioRemovido,
    };
  }
}

