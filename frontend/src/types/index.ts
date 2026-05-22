export interface Student {
    id: number;
    name: string;
    email?: string;
    matricNo?: string;
    gpa?: number;
    enrolledCourses?: Course[];
}

export interface Course {
    id: number;
    name: string;
    grades: Grade[];
}

export interface Grade {
    courseCode?: string;
    subject?: string;
    score: number;
    semester?: string;
    units?: number;
}

export interface PerformanceTrend {
    label: string;
    value: number;
}

export interface AtRiskSubject {
    courseCode: string;
    score: number;
}

export interface ImprovementRecommendation {
    subject: string;
    recommendation: string;
}

export interface StudentProfileType {
    id: number;
    name: string;
    email?: string;
    matricNo?: string;
    grades: Grade[];
    recommendations?: string[];
}

export interface Recommendation {
    title: string;
    description: string;
}

export interface AnalysisResult {
    gpa: number;
    totalGrades: number;
    totalPoints: number;
    performanceTrends: PerformanceTrend[];
    atRiskSubjects: AtRiskSubject[];
}

export interface User {
    id: number;
    username: string;
    email: string;
}
