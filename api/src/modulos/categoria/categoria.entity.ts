import { LivroEntity } from "../livro/livro.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'categorias' })
export class CategoriaEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 200, nullable: false })
  nome: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(() => LivroEntity,
    (livroEntity) => livroEntity.categoria
  )
  livro: LivroEntity;
}