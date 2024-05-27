import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @Column({ name: 'autor', length: 100, nullable: false })
  autor: string;

  @Column({ name: 'categoria', length: 100, nullable: false })
  categoria: string;

}