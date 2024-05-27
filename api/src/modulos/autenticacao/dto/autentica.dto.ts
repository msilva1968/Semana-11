import { IsEmail, IsNotEmpty } from "class-validator";

export class AutenticaDTO {
  @IsEmail(undefined, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'Senha não pode estar vazia' })
  senha: string;
}
