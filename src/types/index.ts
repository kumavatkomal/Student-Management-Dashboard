// Core type definitions for the Student Management Dashboard

export interface Student {
  id: string;
  name: string;
  email: string;
  courseId: number;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: number;
  name: string;
}

export interface StudentFormData {
  name: string;
  email: string;
  courseId: string;
  profileImage: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  courseId?: string;
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}