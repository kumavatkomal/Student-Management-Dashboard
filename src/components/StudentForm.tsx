// Student form component with comprehensive validation
import React, { useState, useEffect } from 'react';
import { Student, Course, StudentFormData, ValidationErrors } from '../types';
import { validateStudent, hasValidationErrors } from '../utils/validation';
import { validateStudentOnServer, getRandomProfileImage } from '../utils/mockApi';
import { LoadingSpinner } from './LoadingSpinner';
import { User, X, Save, UserPlus } from 'lucide-react';

interface StudentFormProps {
  student?: Student;
  courses: Course[];
  onSubmit: (student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  onUpdate?: (student: Student) => void;
}

/**
 * Student Form component - demonstrates controlled components and form validation
 * Shows async validation, loading states, and form handling best practices
 */
export const StudentForm: React.FC<StudentFormProps> = ({
  student,
  courses,
  onSubmit,
  onCancel,
  onUpdate
}) => {
  // Form state management - demonstrates useState with complex state
  const [formData, setFormData] = useState<StudentFormData>({
    name: student?.name || '',
    email: student?.email || '',
    courseId: student?.courseId?.toString() || '',
    profileImage: student?.profileImage || '',
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string>('');

  const isEditing = !!student;

  /**
   * Handle input changes - demonstrates controlled components
   * This pattern ensures React controls the form state
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation errors when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  /**
   * Generate random profile image - demonstrates async operations and state updates
   */
  const handleGenerateRandomImage = () => {
    const randomImage = getRandomProfileImage();
    setFormData(prev => ({
      ...prev,
      profileImage: randomImage
    }));
  };

  /**
   * Form submission handler - demonstrates async/await with validation
   * This function shows proper form handling with client and server validation
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation first
    const errors = validateStudent(formData);
    if (hasValidationErrors(errors)) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setServerError('');

    try {
      // Server-side validation - demonstrates async/await
      if (!isEditing) {
        await validateStudentOnServer({
          name: formData.name.trim(),
          email: formData.email.trim(),
          courseId: parseInt(formData.courseId),
          profileImage: formData.profileImage,
        });
      }

      // Prepare student data
      const studentData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        courseId: parseInt(formData.courseId),
        profileImage: formData.profileImage || getRandomProfileImage(),
      };

      if (isEditing && onUpdate && student) {
        // Update existing student
        onUpdate({
          ...student,
          ...studentData,
        });
      } else {
        // Create new student
        onSubmit(studentData);
      }

    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            {isEditing ? <Save className="w-6 h-6 mr-2" /> : <UserPlus className="w-6 h-6 mr-2" />}
            {isEditing ? 'Edit Student' : 'Add New Student'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Image Section */}
          <div className="text-center">
            <div className="relative inline-block">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-4 border-gray-200 ${formData.profileImage ? 'hidden' : ''}`}>
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
            <button
              type="button"
              onClick={handleGenerateRandomImage}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Generate Random Avatar
            </button>
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                validationErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter student's full name"
              disabled={isSubmitting}
            />
            {validationErrors.name && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                validationErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="student@example.com"
              disabled={isSubmitting}
            />
            {validationErrors.email && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
            )}
          </div>

          {/* Course Selection */}
          <div>
            <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-2">
              Enrolled Course *
            </label>
            <select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                validationErrors.courseId ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            {validationErrors.courseId && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.courseId}</p>
            )}
          </div>

          {/* Profile Image URL */}
          <div>
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image URL (optional)
            </label>
            <input
              type="url"
              id="profileImage"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="https://example.com/image.jpg"
              disabled={isSubmitting}
            />
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{serverError}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                isEditing ? <Save className="w-4 h-4 mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update Student' : 'Add Student')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};