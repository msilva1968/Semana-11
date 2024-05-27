import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsUUID, ValidateNested } from 'class-validator';

export class ItemCarrinhoDTO {
  @IsUUID()
  livroId: string;
  @IsInt()
  quantidade: number;
}

export class AtualizaCarrinhoDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemCarrinhoDTO)
  itensCarrinho: ItemCarrinhoDTO[];
}