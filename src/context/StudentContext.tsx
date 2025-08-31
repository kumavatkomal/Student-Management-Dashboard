// Student Context - demonstrates React Context API and global state management
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Student } from '../types';

// State interface for the student context
interface StudentState {
  students: Student[];
  searchTerm: string;
  selectedCourseFilter: number | null;
}

// Action types for the reducer - demonstrates discriminated unions
type StudentAction =
  | { type: 'ADD_STUDENT'; payload: Student }
  | { type: 'UPDATE_STUDENT'; payload: Student }
  | { type: 'DELETE_STUDENT'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_COURSE_FILTER'; payload: number | null }
  | { type: 'LOAD_STUDENTS'; payload: Student[] };

// Context interface
interface StudentContextType {
  state: StudentState;
  dispatch: React.Dispatch<StudentAction>;
  addStudent: (student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;
  setSearchTerm: (term: string) => void;
  setCourseFilter: (courseId: number | null) => void;
  getFilteredStudents: () => Student[];
}

/**
 * Student reducer - demonstrates pure functions and immutable state updates
 * This function shows how state changes are predictable and testable
 */
const studentReducer = (state: StudentState, action: StudentAction): StudentState => {
  switch (action.type) {
    case 'ADD_STUDENT':
      return {
        ...state,
        students: [...state.students, action.payload]
      };
    
    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id ? action.payload : student
        )
      };
    
    case 'DELETE_STUDENT':
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload)
      };
    
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      };
    
    case 'SET_COURSE_FILTER':
      return {
        ...state,
        selectedCourseFilter: action.payload
      };
    
    case 'LOAD_STUDENTS':
      return {
        ...state,
        students: action.payload
      };
    
    default:
      return state;
  }
};

// Initial state
const initialState: StudentState = {
  students: [],
  searchTerm: '',
  selectedCourseFilter: null,
};

// Create context
const StudentContext = createContext<StudentContextType | undefined>(undefined);

/**
 * Student Provider component - demonstrates context provider pattern
 * This provides global state to all child components
 */
export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);
  
  // Helper functions that encapsulate business logic
  const addStudent = (studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newStudent: Student = {
      ...studentData,
      id: crypto.randomUUID(), // Modern way to generate unique IDs
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: 'ADD_STUDENT', payload: newStudent });
  };
  
  const updateStudent = (student: Student) => {
    const updatedStudent = {
      ...student,
      updatedAt: new Date(),
    };
    dispatch({ type: 'UPDATE_STUDENT', payload: updatedStudent });
  };
  
  const deleteStudent = (id: string) => {
    dispatch({ type: 'DELETE_STUDENT', payload: id });
  };
  
  const setSearchTerm = (term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };
  
  const setCourseFilter = (courseId: number | null) => {
    dispatch({ type: 'SET_COURSE_FILTER', payload: courseId });
  };
  
  /**
   * Filtered students computation - demonstrates array methods and filtering logic
   * This function shows how to combine multiple filter criteria efficiently
   */
  const getFilteredStudents = (): Student[] => {
    return state.students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(state.searchTerm.toLowerCase());
      
      const matchesCourse = state.selectedCourseFilter === null || 
                           student.courseId === state.selectedCourseFilter;
      
      return matchesSearch && matchesCourse;
    });
  };
  
  const contextValue: StudentContextType = {
    state,
    dispatch,
    addStudent,
    updateStudent,
    deleteStudent,
    setSearchTerm,
    setCourseFilter,
    getFilteredStudents,
  };
  
  return (
    <StudentContext.Provider value={contextValue}>
      {children}
    </StudentContext.Provider>
  );
};

/**
 * Custom hook to use Student Context - demonstrates custom hooks pattern
 * This ensures type safety and prevents context usage outside of provider
 */
export const useStudentContext = (): StudentContextType => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};