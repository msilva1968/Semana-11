import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, MaxLength, Min, MinDate } from "class-validator";
import { ISBNUnico } from "../validators/isbnUnico.validator";

export class CriaLivroDTO {
  @IsNotEmpty({ message: 'O titulo não pode ser vazio.' })
  titulo: string;

  @IsNotEmpty({ message: 'O resumo não pode ser vazio.' })
  @MaxLength(500, { message: 'O resumo precisa ter no máximo 500 caracteres' })
  resumo: string;

  @IsNotEmpty({ message: 'O sumario não pode ser vazio.' })
  @MaxLength(100, { message: 'O sumario precisa ter no máximo 100 caracteres' })
  sumario: string;

  @IsNotEmpty({ message: 'O preço não pode ser vazio.' })
  @IsNumber()
  @Min(0, { message: 'O menor valor de um livro é 0 (gratis)' })
  preco: number;

  @IsNotEmpty({ message: 'O numero de páginas não pode ser vazio.' })
  @IsNumber()
  @Min(1, { message: 'O mínimo de páginas é 1' })
  numPaginas: number;

  @IsNotEmpty({ message: 'O ISBN não pode ser vazio.' })
  @ISBNUnico({ message: 'Já existe um livro com este ISBN haha' })
  ISBN: string;

  @Type(() => Date)
  @IsDate({ message: 'A data deve ser válida.' })
  @MinDate(new Date(), { message: 'A data deve ser maior que a data atual.' })
  dataPublicacao: Date;

  @IsNotEmpty({ message: 'A quantidade disponível não pode ser vazia.' })
  @IsNumber()
  @Min(0)
  quantidadeDisponivel: number;

  @IsNotEmpty({ message: 'O ID da Categoria não pode ser vazio.' })
  categoriaId: string;

  @IsNotEmpty({ message: 'O ID do Autor não pode ser vazio.' })
  autorId: string;

}