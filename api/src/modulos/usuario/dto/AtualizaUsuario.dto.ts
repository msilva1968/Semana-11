import { PartialType } from "@nestjs/mapped-types";
import { CriarUsuarioDTO } from "./CriarUsuario.dto";

export class AtualizarUsuarioDTO extends PartialType(CriarUsuarioDTO) { }