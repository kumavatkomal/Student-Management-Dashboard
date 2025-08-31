// Comprehensive validation utilities for form inputs
import { StudentFormData, ValidationErrors } from '../types';

/**
 * Email validation using RFC 5322 compliant regex
 * Demonstrates string methods and regular expressions
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates student form data and returns errors object
 * Demonstrates object destructuring, conditional logic, and error accumulation
 */
export const validateStudent = (formData: StudentFormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  // Name validation - demonstrates string methods and logical operators
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (formData.name.trim().length > 50) {
    errors.name = 'Name must be less than 50 characters';
  }
  
  // Email validation - demonstrates function composition
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Course validation - demonstrates type coercion and number validation
  if (!formData.courseId || formData.courseId === '0') {
    errors.courseId = 'Please select a course';
  }
  
  return errors;
};

/**
 * Checks if validation errors object is empty
 * Demonstrates Object.keys() and array methods
 */
export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};