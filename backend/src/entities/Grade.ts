import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from './Student';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  courseCode!: string;

  @Column('int')
  units!: number;

  @Column('int')
  score!: number;

  @ManyToOne(() => Student, (student) => student.grades, { onDelete: 'CASCADE' })
  student!: Student;
}