import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

@Entity({ name: 'usuario_enderecos' })
export class UsuarioEnderecoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'rua', length: 400, nullable: false })
  rua: string;

  @Column({ name: 'numero', length: 30, nullable: false })
  numero: string;

  @Column({ name: 'complemento', length: 50, nullable: false })
  complemento: string;

  @Column({ name: 'bairro', length: 100, nullable: false })
  bairro: string;

  @Column({ name: 'cidade', length: 100, nullable: false })
  cidade: string;

  @Column({ name: 'estado', length: 100, nullable: false })
  estado: string;

  @Column({ name: 'cep', length: 8, nullable: false })
  cep: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.enderecos, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  usuario: UsuarioEntity;
}