import { Grade } from '../entities/Grade';
import { calculateGPA } from './analysisService';

export function analyzeRiskAndRecommend(grades: Grade[]) {
  const { gpa } = calculateGPA(grades);
  const weakSubjects = grades.filter(g => g.score < 50).map(g => ({ courseCode: g.courseCode, score: g.score, units: g.units }));
  const highUnitWeak = weakSubjects.filter(s => s.units >= 3);
  const recommendations: string[] = [];

  if (gpa <= 2.0) recommendations.push('Your GPA is low — consider meeting your academic advisor and creating a study plan.');
  if (highUnitWeak.length) recommendations.push('Focus on improving performance in your 3+ unit courses: ' + highUnitWeak.map(s => s.courseCode).join(', '));
  if (weakSubjects.length && !highUnitWeak.length) recommendations.push('Review the following weak subjects: ' + weakSubjects.map(s => s.courseCode).join(', '));
  if (gpa >= 3.5) recommendations.push('Good work — keep tracking trends and strengthen weak spots for an even better result.');

  return {
    gpa,
    isAtRisk: gpa < 2.0 || weakSubjects.length > 0,
    weakSubjects,
    recommendations
  };
}