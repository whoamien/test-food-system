import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "datetime", nullable: true })
  last_login: Date;
}
