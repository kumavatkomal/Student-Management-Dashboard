// Main dashboard component orchestrating all functionality
import React, { useState, useCallback } from 'react';
import { Student } from '../types';
import { useStudentContext } from '../context/StudentContext';
import { useCourses } from '../hooks/useCourses';
import { StudentForm } from './StudentForm';
import { StudentList } from './StudentList';
import { SearchAndFilter } from './SearchAndFilter';
import { LoadingSpinner } from './LoadingSpinner';
import { GraduationCap, Plus, AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Main Dashboard component - demonstrates component composition and state management
 * This component orchestrates all the dashboard functionality
 */
export const Dashboard: React.FC = () => {
  const { 
    state, 
    addStudent, 
    updateStudent, 
    deleteStudent, 
    setSearchTerm, 
    setCourseFilter, 
    getFilteredStudents 
  } = useStudentContext();

  const { courses, loading: coursesLoading, error: coursesError, retryCourses } = useCourses();

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | undefined>();

  /**
   * Memoized filtered students - demonstrates useCallback for optimization
   * This prevents unnecessary re-computations when dependencies haven't changed
   */
  const filteredStudents = getFilteredStudents();

  /**
   * Handle form submission - demonstrates useCallback for stable function references
   */
  const handleAddStudent = useCallback((studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => {
    addStudent(studentData);
    setShowForm(false);
  }, [addStudent]);

  /**
   * Handle student updates
   */
  const handleUpdateStudent = useCallback((student: Student) => {
    updateStudent(student);
    setEditingStudent(undefined);
  }, [updateStudent]);

  /**
   * Handle edit initiation
   */
  const handleEditStudent = useCallback((student: Student) => {
    setEditingStudent(student);
  }, []);

  /**
   * Handle form cancellation
   */
  const handleCancelForm = useCallback(() => {
    setShowForm(false);
    setEditingStudent(undefined);
  }, []);

  // Loading state for courses
  if (coursesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state for courses
  if (coursesError || !courses) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Courses</h1>
          <p className="text-gray-600 mb-4">{coursesError}</p>
          <button
            onClick={retryCourses}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Student Management Dashboard
              </h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <SearchAndFilter
          searchTerm={state.searchTerm}
          onSearchChange={setSearchTerm}
          selectedCourse={state.selectedCourseFilter}
          onCourseFilterChange={setCourseFilter}
          courses={courses}
          resultsCount={filteredStudents.length}
        />

        {/* Student List */}
        <StudentList
          students={filteredStudents}
          courses={courses}
          onEditStudent={handleEditStudent}
          onDeleteStudent={deleteStudent}
        />
      </main>

      {/* Form Modals */}
      {showForm && (
        <StudentForm
          courses={courses}
          onSubmit={handleAddStudent}
          onCancel={handleCancelForm}
        />
      )}

      {editingStudent && (
        <StudentForm
          student={editingStudent}
          courses={courses}
          onSubmit={handleAddStudent}
          onUpdate={handleUpdateStudent}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};