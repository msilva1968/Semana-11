import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UsuarioEnderecoEntity } from "./usuario-endereco.entity";
import { PedidoEntity } from "../pedido/pedido.entity";
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

  @OneToOne(
    () => UsuarioEnderecoEntity,
    (enderecoEntity) => enderecoEntity.usuario,
    { cascade: true }
  )
  enderecos: UsuarioEnderecoEntity[];

  @OneToMany(() => PedidoEntity, (pedido) => pedido.usuario)
  pedidos: PedidoEntity[];


}