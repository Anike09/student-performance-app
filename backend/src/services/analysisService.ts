import { Student } from '../entities/Student';
import { Grade } from '../entities/Grade';
import { AppDataSource } from '../config/data-source';

export const analyzePerformance = async (studentId: string): Promise<any> => {
    const studentRepo = AppDataSource.getRepository(Student);
    const student = await studentRepo.findOne({ where: { id: Number(studentId) }, relations: ['grades'] });
    if (!student) throw new Error('Student not found');

    const grades: Grade[] = student.grades || [];
    const totalGrades = grades.length;
    const totalPoints = grades.reduce((acc, grade) => acc + grade.score, 0);
    const gpa = totalGrades === 0 ? 0 : +(totalPoints / totalGrades).toFixed(2);

    const performanceTrends = calculateTrends(grades);
    const atRiskSubjects = identifyAtRiskSubjects(grades);

    return {
        gpa,
        totalGrades,
        totalPoints,
        performanceTrends,
        atRiskSubjects,
    };
};

const calculateTrends = (grades: Grade[]): any => {
    const sortedGrades = grades.slice().sort((a, b) => (a.id || 0) - (b.id || 0));
    return sortedGrades.map((grade, index) => ({
        label: grade.courseCode || `Course ${index + 1}`,
        value: grade.score,
    }));
};

const identifyAtRiskSubjects = (grades: Grade[]): Array<{ courseCode: string; score: number }> => {
    const threshold = 50;
    return grades
        .filter((grade) => grade.score < threshold)
        .map((grade) => ({ courseCode: grade.courseCode, score: grade.score }));
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
