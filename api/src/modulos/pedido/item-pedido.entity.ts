import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PedidoEntity } from './pedido.entity';
import { LivroEntity } from '../livro/livro.entity';

@Entity({ name: 'itens_pedidos' })
export class ItemPedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'preco_venda', nullable: false })
  precoVenda: number;

  @ManyToOne(() => PedidoEntity, pedido => pedido.itensPedido, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  pedido: PedidoEntity;

  @ManyToOne(() => LivroEntity, livro => livro.itensPedido, {
    cascade: ['update']
  })
  livro: LivroEntity;
}