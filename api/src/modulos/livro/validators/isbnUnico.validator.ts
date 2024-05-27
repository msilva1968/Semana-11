import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { LivroService } from '../livro.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class ISBNUnicoValidator implements ValidatorConstraintInterface {
  constructor(private readonly livroService: LivroService) { }

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const livroComISBNExiste = await this.livroService.existeISBN(value);
    return !livroComISBNExiste;
  }
}

export const ISBNUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: ISBNUnicoValidator,
    });
  };
};
