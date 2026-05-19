import { Student } from '../models/student';
import { Grade } from '../entities/Grade';

export const analyzePerformance = async (studentId: string): Promise<any> => {
    const student: Student = await Student.findById(studentId).populate('grades');
    const grades: Grade[] = student.grades;

    const totalGrades = grades.length;
    const totalPoints = grades.reduce((acc, grade) => acc + grade.points, 0);
    const gpa = totalPoints / totalGrades;

    const performanceTrends = calculateTrends(grades);

    return {
        gpa,
        performanceTrends,
        atRiskSubjects: identifyAtRiskSubjects(grades),
    };
};

const calculateTrends = (grades: Grade[]): any => {
    // Logic to analyze trends over time
    return {};
};

const identifyAtRiskSubjects = (grades: Grade[]): string[] => {
    const threshold = 2.0; // Example threshold for at-risk subjects
    return grades
        .filter(grade => grade.points < threshold)
        .map(grade => grade.subject);
};

export function scoreToPoint(score: number): number {
  // 5-point scale example
  if (score >= 70) return 5;
  if (score >= 60) return 4;
  if (score >= 50) return 3;
  if (score >= 45) return 2;
  if (score >= 40) return 1;
  return 0;
}

export function calculateGPA(grades: Grade[]) {
  const totalUnits = grades.reduce((s, g) => s + (g.units || 0), 0);
  if (totalUnits === 0) return { gpa: 0, totalUnits: 0 };
  const totalPoints = grades.reduce((s, g) => s + scoreToPoint(g.score) * g.units, 0);
  const gpa = +(totalPoints / totalUnits).toFixed(2);
  return { gpa, totalUnits };
}