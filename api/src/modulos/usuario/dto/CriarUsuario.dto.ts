import { IsEmail, IsNotEmpty, IsNumberString, IsString, Matches, MinLength} from "class-validator";
import { EmailUnico } from "../validators/emailUnico.validator";

export class CriarUsuarioDTO {
  @IsNotEmpty({ message: 'Nome do usuario não pode ser vazio' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailUnico({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, {
    message: 'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 6 e 30 caracteres',
  })
  senha: string;

  @IsNotEmpty({ message: 'CPF não pode ser vazio' })
  @IsNumberString(undefined, { message: 'O campo CPF deve conter apenas números.' })
  cpf: string;

  @IsNotEmpty({ message: 'Telefone não pode ser vazio.' })
  @IsNumberString(undefined, { message: 'O telefone deve conter apenas números.' })
  telefone: string;

  @IsNotEmpty({ message: 'Endereço não pode ser vazio.' })
  endereco: string;
}