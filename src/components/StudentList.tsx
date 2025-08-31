// Student list component with grid layout
import React, { useMemo } from 'react';
import { Student, Course } from '../types';
import { StudentCard } from './StudentCard';
import { Users, BookOpen } from 'lucide-react';

interface StudentListProps {
  students: Student[];
  courses: Course[];
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
}

/**
 * Student List component - demonstrates useMemo for performance optimization
 * Shows how to optimize expensive computations and prevent unnecessary re-renders
 */
export const StudentList: React.FC<StudentListProps> = ({
  students,
  courses,
  onEditStudent,
  onDeleteStudent
}) => {
  /**
   * Memoized course lookup map - demonstrates useMemo for performance
   * This prevents recreation of the course map on every render
   */
  const courseMap = useMemo(() => {
    return courses.reduce((map, course) => {
      map[course.id] = course;
      return map;
    }, {} as Record<number, Course>);
  }, [courses]);

  /**
   * Get course for student - demonstrates memoized computations
   */
  const getCourseForStudent = (student: Student): Course | undefined => {
    return courseMap[student.courseId];
  };

  if (students.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <Users className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
        <p className="text-gray-500">
          Start by adding your first student to the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Grid Layout - demonstrates responsive grid system */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map(student => (
          <StudentCard
            key={student.id}
            student={student}
            course={getCourseForStudent(student)}
            onEdit={onEditStudent}
            onDelete={onDeleteStudent}
          />
        ))}
      </div>

      {/* Statistics */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Course Enrollment Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map(course => {
            const enrolledCount = students.filter(s => s.courseId === course.id).length;
            return (
              <div key={course.id} className="bg-gray-50 rounded-lg p-4">
                <div className="font-medium text-gray-900">{course.name}</div>
                <div className="text-2xl font-bold text-blue-600">{enrolledCount}</div>
                <div className="text-sm text-gray-500">
                  student{enrolledCount !== 1 ? 's' : ''} enrolled
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};