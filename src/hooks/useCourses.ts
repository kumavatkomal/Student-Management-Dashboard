// Custom hook for course management - demonstrates async/await and state management
import { useState, useEffect } from 'react';
import { Course, ApiState } from '../types';
import { fetchCourses } from '../utils/mockApi';

/**
 * Custom hook for managing courses data
 * Demonstrates async/await, error handling, and the useEffect hook
 */
export const useCourses = () => {
  const [apiState, setApiState] = useState<ApiState<Course[]>>({
    data: null,
    loading: true,
    error: null,
  });

  /**
   * Fetches courses with proper error handling
   * Demonstrates async/await pattern and error boundaries
   */
  const loadCourses = async () => {
    try {
      setApiState(prev => ({ ...prev, loading: true, error: null }));
      
      // This demonstrates async/await - the function pauses here until fetchCourses resolves
      const courses = await fetchCourses();
      
      setApiState({
        data: courses,
        loading: false,
        error: null,
      });
    } catch (error) {
      setApiState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load courses',
      });
    }
  };

  /**
   * Effect hook for initial data loading
   * Demonstrates useEffect with empty dependency array for mounting behavior
   */
  useEffect(() => {
    // This async function call demonstrates how async operations work in useEffect
    loadCourses();
  }, []); // Empty dependency array ensures this runs only once on mount

  /**
   * Retry function for failed requests
   * Demonstrates error recovery patterns
   */
  const retryCourses = () => {
    loadCourses();
  };

  return {
    courses: apiState.data,
    loading: apiState.loading,
    error: apiState.error,
    retryCourses,
  };
};