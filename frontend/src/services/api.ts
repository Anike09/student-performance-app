import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'student-dashboard-token';

export interface AuthStudent {
  id: number;
  email: string;
  username: string;
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  student: AuthStudent;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem(TOKEN_KEY);
    delete apiClient.defaults.headers.common.Authorization;
  }
};

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const signupStudent = async (payload: {
  email: string;
  username: string;
  password: string;
  name?: string;
}) => {
  const response = await apiClient.post<AuthResponse>('/auth/register', payload);
  return response.data;
};

export const loginStudent = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await apiClient.post<AuthResponse>('/auth/login', payload);
  return response.data;
};

export const getCurrentStudent = async () => {
  const response = await apiClient.get<{ student: AuthStudent }>('/auth/me');
  return response.data.student;
};

export const getStudents = async () => {
  const response = await apiClient.get('/students');
  return response.data;
};

export const fetchStudents = getStudents;

export const createStudent = async (student: {
  name: string;
  email: string;
  matricNo: string;
}) => {
  const response = await apiClient.post('/students', student);
  return response.data;
};

export const getStudentProfile = async (studentId: string) => {
  const response = await apiClient.get(`/students/${studentId}`);
  const payload = response.data;
  return {
    ...payload.student,
    recommendations: payload.analysis?.recommendations || [],
  };
};

export const getStudentGrades = async (studentId: string) => {
  const response = await apiClient.get(`/students/${studentId}/grades`);
  return response.data;
};

export const submitGrade = async (studentId: string, gradeData: unknown) => {
  const response = await apiClient.post(`/students/${studentId}/grades`, gradeData);
  return response.data;
};

export const getPerformanceAnalysis = async (studentId: string) => {
  const response = await apiClient.get(`/students/${studentId}/analysis`);
  return response.data;
};

export const getRecommendations = async (studentId?: string) => {
  const endpoint = studentId
    ? `/students/${studentId}/recommendations`
    : '/courses/recommendations';
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const getGpaSummary = async () => {
  const response = await apiClient.get('/courses/gpa');
  return response.data;
};
