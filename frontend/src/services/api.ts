import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust the base URL as needed

// Function to get all students
export const getStudents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/students`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching students: ' + (error as Error).message);
    }
};

export const fetchStudents = getStudents;

export const createStudent = async (student: { name: string; email: string; matricNo: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/students`, student);
        return response.data;
    } catch (error) {
        throw new Error('Error creating student: ' + (error as Error).message);
    }
};

// Function to get a specific student's profile
export const getStudentProfile = async (studentId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/students/${studentId}`);
        const payload = response.data;
        return {
            ...payload.student,
            recommendations: payload.analysis?.recommendations || [],
        };
    } catch (error) {
        throw new Error('Error fetching student profile: ' + (error as Error).message);
    }
};

// Function to get grades for a specific student
export const getStudentGrades = async (studentId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/students/${studentId}/grades`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching student grades: ' + (error as Error).message);
    }
};

// Function to submit a new grade
export const submitGrade = async (studentId: string, gradeData: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/students/${studentId}/grades`, gradeData);
        return response.data;
    } catch (error) {
        throw new Error('Error submitting grade: ' + (error as Error).message);
    }
};

// Function to get performance analysis
export const getPerformanceAnalysis = async (studentId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/students/${studentId}/analysis`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching performance analysis: ' + (error as Error).message);
    }
};

// Function to get personalized recommendations
export const getRecommendations = async (studentId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/students/${studentId}/recommendations`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching recommendations: ' + (error as Error).message);
    }
};