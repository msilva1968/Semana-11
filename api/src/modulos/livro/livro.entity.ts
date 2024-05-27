import { ItemPedidoEntity } from "../pedido/item-pedido.entity";
import { AutorEntity } from "../autor/autor.entity";
import { CategoriaEntity } from "../categoria/categoria.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'livros' })
export class LivroEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'titulo', length: 100, nullable: false })
  titulo: string;

  @Column({ name: 'resumo', length: 500, nullable: false })
  resumo: string;

  @Column({ name: 'sumario', length: 100, nullable: false })
  sumario: string;

  @Column({ name: 'preco', nullable: false })
  preco: number;

  @Column({ name: 'num_paginas', nullable: false })
  numPaginas: number;

  @Column({ name: 'ISBN', length: 100, nullable: false })
  ISBN: string;

  @Column({ name: 'dataPublicacao', nullable: false, type: 'date' })
  dataPublicacao: Date;

  @Column({ name: 'quantidade_disponivel', nullable: false })
  quantidadeDisponivel: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne(() => AutorEntity,
    (autor) => autor.livro,
    { eager: true }
  )
  autor: AutorEntity;

  @ManyToOne(() => CategoriaEntity,
    (categoriaEntity) => categoriaEntity.livro
  )
  categoria: CategoriaEntity;

  @OneToMany(() => ItemPedidoEntity, itemPedido => itemPedido.livro)
  itensPedido: ItemPedidoEntity[];
}