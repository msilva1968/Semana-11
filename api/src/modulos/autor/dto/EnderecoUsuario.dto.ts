import { IsNotEmpty, IsNumberString } from "class-validator";
import { UsuarioEntity } from "../../usuario/usuario.entity";

export class EnderecoUsuarioDTO {
  id: string;

  @IsNotEmpty({ message: 'O nome da rua não pode ser vazio.' })
  rua: string;

  @IsNotEmpty({ message: 'O numero da casa não pode ser vazio.' })
  numero: string;

  @IsNotEmpty({ message: 'O complemento da casa não pode ser vazio.' })
  complemento: string;

  @IsNotEmpty({ message: 'O bairro não pode ser vazio.' })
  bairro: string;

  @IsNotEmpty({ message: 'A cidade não pode ser vazia.' })
  cidade: string;

  @IsNotEmpty({ message: 'O Estado não pode ser vazio.' })
  estado: string;

  @IsNotEmpty({ message: 'O CEP não pode ser vazio.' })
  @IsNumberString(undefined, { message: 'O CEP deve conter apenas números.' })
  cep: string;

  usuario: UsuarioEntity;
}