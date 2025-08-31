// Search and filter component with debounced input
import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { Search, Filter, X } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCourse: number | null;
  onCourseFilterChange: (courseId: number | null) => void;
  courses: Course[];
  resultsCount: number;
}

/**
 * Search and Filter component - demonstrates debouncing and controlled inputs
 * Shows performance optimization through debounced search
 */
export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedCourse,
  onCourseFilterChange,
  courses,
  resultsCount
}) => {
  // Local state for immediate UI updates
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  
  // Debounced search term - demonstrates performance optimization
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  /**
   * Effect to sync debounced search with parent component
   * Demonstrates useEffect with dependencies and performance optimization
   */
  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    onSearchChange('');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students by name or email..."
              value={localSearchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            {localSearchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Course Filter */}
        <div className="md:w-64">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCourse || ''}
              onChange={(e) => onCourseFilterChange(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none bg-white"
            >
              <option value="">All Courses</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {resultsCount} student{resultsCount !== 1 ? 's' : ''}
        {(localSearchTerm || selectedCourse) && (
          <span className="ml-1">
            matching your criteria
          </span>
        )}
      </div>
    </div>
  );
};