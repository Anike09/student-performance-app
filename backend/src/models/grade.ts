export interface Grade {
    id: number;
    studentId: number;
    subject: string;
    score: number;
    semester: string;
    createdAt: Date;
    updatedAt: Date;
}