// Mock API utilities demonstrating async/await and event loop concepts
import { Course, Student } from '../types';

/**
 * Simulated network delay to demonstrate async behavior and loading states
 * This function shows how setTimeout works with Promises and the event loop
 */
const simulateNetworkDelay = (ms: number = 800): Promise<void> => {
  return new Promise((resolve) => {
    // This setTimeout demonstrates the event loop:
    // 1. The callback is placed in the Timer Queue
    // 2. After the specified time, it moves to the Task Queue
    // 3. The Event Loop processes it when the Call Stack is empty
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

/**
 * Mock courses data - in a real app, this would come from a database
 */
const mockCourses: Course[] = [
  { id: 1, name: 'HTML Basics' },
  { id: 2, name: 'CSS Mastery' },
  { id: 3, name: 'JavaScript Pro' },
  { id: 4, name: 'React In Depth' },
  { id: 5, name: 'Node.js Fundamentals' },
  { id: 6, name: 'Database Design' },
];

/**
 * Fetches available courses with simulated network delay
 * Demonstrates async/await pattern and error handling
 */
export const fetchCourses = async (): Promise<Course[]> => {
  try {
    // Simulate network request - demonstrates async/await
    await simulateNetworkDelay(600);
    
    // Simulate occasional network failures (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('Network error: Unable to fetch courses');
    }
    
    // Return deep copy to prevent mutation
    return JSON.parse(JSON.stringify(mockCourses));
  } catch (error) {
    // Re-throw with context for better error handling
    throw new Error(`Failed to fetch courses: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Validates student data on the "server side"
 * Demonstrates async validation and error responses with event loop timing
 */
export const validateStudentOnServer = async (studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
  // This demonstrates the event loop with multiple async operations:
  console.log('1. Validation started (synchronous)');
  
  // Immediate promise (microtask queue)
  await Promise.resolve().then(() => {
    console.log('2. Microtask executed before setTimeout');
  });
  
  // Timer-based delay (task queue)
  await simulateNetworkDelay(300);
  console.log('3. Network delay completed (after timer)');
  
  // Simulate email uniqueness check
  const existingEmails = ['test@example.com', 'admin@test.com'];
  if (existingEmails.includes(studentData.email.toLowerCase())) {
    throw new Error('A student with this email already exists');
  }
  
  console.log('4. Validation completed successfully');
};

/**
 * Generates random student profile images from Pexels
 * Demonstrates array methods and randomization
 */
export const getRandomProfileImage = (): string => {
  const profileImages = [
    'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face'
  ];
  
  return profileImages[Math.floor(Math.random() * profileImages.length)];
};