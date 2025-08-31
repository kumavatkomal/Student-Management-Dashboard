// Individual student card component
import React from 'react';
import { Student, Course } from '../types';
import { Mail, Edit3, Trash2, User } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  course: Course | undefined;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

/**
 * Student Card component - demonstrates component composition and event handling
 * Shows how to create reusable UI components with proper prop typing
 */
export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  course,
  onEdit,
  onDelete
}) => {
  /**
   * Handle delete with confirmation - demonstrates event handling and user interaction
   */
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      onDelete(student.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
      {/* Profile Section */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          {student.profileImage ? (
            <img
              src={student.profileImage}
              alt={`${student.name}'s profile`}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              onError={(e) => {
                // Fallback for broken images
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center ${student.profileImage ? 'hidden' : ''}`}>
            <User className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-gray-900 truncate">
            {student.name}
          </h3>
          <p className="text-sm text-gray-500 flex items-center mt-1">
            <Mail className="w-4 h-4 mr-1" />
            {student.email}
          </p>
        </div>
      </div>

      {/* Course Information */}
      <div className="mb-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {course?.name || 'Unknown Course'}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(student)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
        >
          <Edit3 className="w-4 h-4 mr-1" />
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </button>
      </div>

      {/* Timestamps */}
      <div className="mt-3 text-xs text-gray-400">
        Added: {student.createdAt.toLocaleDateString()}
      </div>
    </div>
  );
};