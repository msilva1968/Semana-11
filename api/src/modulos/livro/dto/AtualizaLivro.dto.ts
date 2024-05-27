import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsUUID, MaxLength, Min, MinDate } from "class-validator";
import { ISBNUnico } from "../validators/isbnUnico.validator";

export class AtualizaLivroDTO {

  @IsUUID(undefined, { message: 'ID do livro inválido' })
  id: string;

  @IsUUID(undefined, { message: 'ID do autor inválido' })
  @IsOptional()
  autorId: string;

  @IsUUID(undefined, { message: 'ID da categoria inválido' })
  @IsOptional()
  categoriaId: string;

  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsOptional()
  titulo: string;

  @IsNotEmpty({ message: 'O resumo não pode ser vazio.' })
  @MaxLength(500, { message: 'O resumo precisa ter no máximo 500 caracteres' })
  @IsOptional()
  resumo: string;

  @IsNotEmpty({ message: 'O sumario não pode ser vazio.' })
  @MaxLength(100, { message: 'O sumario precisa ter no máximo 100 caracteres' })
  @IsOptional()
  sumario: string;

  @IsNotEmpty({ message: 'O preço não pode ser vazio.' })
  @IsNumber()
  @Min(0, { message: 'O menor valor de um livro é 0 (gratis)' })
  @IsOptional()
  preco: number;

  @IsNotEmpty({ message: 'O numero de páginas não pode ser vazio.' })
  @IsNumber()
  @Min(1, { message: 'O mínimo de páginas é 1' })
  @IsOptional()
  numPaginas: number;

  @IsNotEmpty({ message: 'O ISBN não pode ser vazio.' })
  @ISBNUnico({ message: 'Já existe um livro com este ISBN' })
  @IsOptional()
  ISBN: string;

  @Type(() => Date)
  @IsDate({ message: 'A data deve ser válida.' })
  @MinDate(new Date(), { message: 'A data deve ser maior que a data atual.' })
  @IsOptional()
  dataPublicacao: Date;
}