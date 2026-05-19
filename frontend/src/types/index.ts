export interface Student {
    id: number;
    name: string;
    email: string;
    enrolledCourses: Course[];
}

export interface Course {
    id: number;
    name: string;
    grades: Grade[];
}

export interface Grade {
    subject: string;
    score: number;
    semester: string;
}

export interface PerformanceTrend {
    subject: string;
    trend: number[];
}

export interface AtRiskSubject {
    subject: string;
    averageScore: number;
    isAtRisk: boolean;
}

export interface ImprovementRecommendation {
    subject: string;
    recommendation: string;
}