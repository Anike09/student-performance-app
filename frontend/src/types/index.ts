export interface Student {
    id: number;
    name: string;
    email: string;
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
    subject: string;
    trend: number[];
}

export interface AtRiskSubject {
    subject: string;
    averageGrade: number;
    threshold: number;
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
    trend: PerformanceTrend[];
    atRiskSubjects: AtRiskSubject[];
    recommendations: string[];
}
