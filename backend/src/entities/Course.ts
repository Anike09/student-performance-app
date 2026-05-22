import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  courseCode!: string;

  @Column()
  courseName!: string;

  @Column("int")
  score!: number;

  @Column()
  grade!: string;

  @Column("int")
  creditUnit!: number;

  @Column()
  semester!: string;

  @Column()
  session!: string;

  @ManyToOne(() => Student, (student) => student.courses, {
    onDelete: "CASCADE",
  })
  student!: Student;
}
