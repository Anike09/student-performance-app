import { Course } from "../entities/Course";

export type LetterGrade = "A" | "B" | "C" | "D" | "E" | "F";

export const gradePoints: Record<LetterGrade, number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
};

export const scoreToGrade = (score: number): LetterGrade => {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 45) return "D";
  if (score >= 40) return "E";
  return "F";
};

export const gradeToPoint = (grade: string): number => {
  const normalizedGrade = grade.toUpperCase() as LetterGrade;
  return gradePoints[normalizedGrade] ?? 0;
};

export const calculateGPA = (courses: Course[]) => {
  const totalCreditUnits = courses.reduce(
    (total, course) => total + course.creditUnit,
    0
  );

  if (totalCreditUnits === 0) {
    return {
      gpa: 0,
      totalCreditUnits: 0,
      totalGradePoints: 0,
    };
  }

  const totalGradePoints = courses.reduce((total, course) => {
    const grade = course.grade || scoreToGrade(course.score);
    return total + gradeToPoint(grade) * course.creditUnit;
  }, 0);

  return {
    gpa: Number((totalGradePoints / totalCreditUnits).toFixed(2)),
    totalCreditUnits,
    totalGradePoints,
  };
};

export const calculateCGPA = (courses: Course[]) => {
  const result = calculateGPA(courses);

  return {
    cgpa: result.gpa,
    totalCreditUnits: result.totalCreditUnits,
    totalGradePoints: result.totalGradePoints,
  };
};
