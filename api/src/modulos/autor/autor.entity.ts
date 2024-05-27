import { LivroEntity } from '../livro/livro.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'

@Entity({ name: 'autores' })
export class AutorEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 200, nullable: false })
  nome: string;

  @Column({ name: 'email', length: 100, nullable: false })
  email: string;

  @Column({ name: 'biografia', length: 500, nullable: false })
  biografia: string;

  @Column({ name: 'dataCadastro', nullable: false, type: 'date' })
  dataCadastro: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(() => LivroEntity,
    (livroEntity) => livroEntity.autor
  )
  livro: LivroEntity;
}