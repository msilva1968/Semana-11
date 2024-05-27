import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity({ name: 'usuarios' })
export class UsuarioEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 200, nullable: false })
  nome: string;

  @Column({ name: 'email', length: 100, nullable: false })
  email: string;

  @Exclude()
  @Column({ name: 'senha', length: 256, nullable: false })
  senha: string;

  @Column({ name: 'cpf', length: 14, nullable: false })
  cpf: string;

  @Column({ name: 'telefone', length: 11, nullable: false })
  telefone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @Column({ name: 'endere3co', length: 200, nullable: false })
  endereco: string;
 
}