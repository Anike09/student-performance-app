import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Grade } from "./Grade";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true, unique: true })
  matricNo?: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true, nullable: true })
  username?: string;

  @Column({ nullable: true })
  password?: string;

  @OneToMany(() => Grade, (grade) => grade.student)
  grades!: Grade[];

  @CreateDateColumn()
  createdAt!: Date;
}
