import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Grade } from './Grade';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  matricNo!: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  name!: string;

  @OneToMany(() => Grade, (grade) => grade.student, { cascade: true })
  grades!: Grade[];
}