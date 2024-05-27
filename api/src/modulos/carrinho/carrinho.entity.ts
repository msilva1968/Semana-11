import { ItemCarrinhoEntity } from "./item-carrinho.entity";

export class CarrinhoEntity {
  id: string;
  valorTotal: number;
  itensCarrinho: ItemCarrinhoEntity[];
}