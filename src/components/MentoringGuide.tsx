// Mentoring Guide component - educational content for learning
import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight, Code, Zap, Layers, CheckCircle } from 'lucide-react';

/**
 * Interactive Mentoring Guide component
 * This component demonstrates the key concepts used in the Student Management Dashboard
 */
export const MentoringGuide: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const sections = [
    {
      id: 'async-await',
      title: 'Async/Await and the Event Loop',
      icon: <Zap className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            This project demonstrates async/await in multiple places:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Course Loading:</strong> The useCourses hook fetches course data asynchronously</li>
            <li><strong>Form Validation:</strong> Server-side validation simulates real API calls</li>
            <li><strong>Debounced Search:</strong> Uses setTimeout to delay search execution</li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Event Loop Example:</h4>
            <code className="text-sm text-gray-800">
              {`// The setTimeout in useDebounce demonstrates the event loop:
1. setTimeout schedules callback in Timer Queue
2. After delay, moves to Task Queue  
3. Event Loop processes when Call Stack is empty`}
            </code>
          </div>
        </div>
      )
    },
    {
      id: 'react-patterns',
      title: 'React Best Practices',
      icon: <Layers className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Controlled Components:</strong> All form inputs are controlled by React state</li>
            <li><strong>Custom Hooks:</strong> useCourses and useDebounce encapsulate logic</li>
            <li><strong>Context API:</strong> Global state management for students</li>
            <li><strong>useMemo:</strong> Optimizes course lookups in StudentList</li>
            <li><strong>useCallback:</strong> Prevents unnecessary re-renders</li>
          </ul>
        </div>
      )
    },
    {
      id: 'state-management',
      title: 'State Management Strategy',
      icon: <Code className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            The app uses a combination of local and global state:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Global State (Context):</strong> Student data, search, filters</li>
            <li><strong>Local State:</strong> Form data, loading states, UI states</li>
            <li><strong>Derived State:</strong> Filtered students computed from global state</li>
          </ul>
        </div>
      )
    },
    {
      id: 'performance',
      title: 'Performance Optimizations',
      icon: <CheckCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Debounced Search:</strong> Reduces API calls and improves UX</li>
            <li><strong>Memoized Computations:</strong> Course lookups cached with useMemo</li>
            <li><strong>Stable Function References:</strong> useCallback prevents re-renders</li>
            <li><strong>Component Splitting:</strong> Smaller components for better re-render control</li>
          </ul>
        </div>
      )
    },
    {
      id: 'javascript-concepts',
      title: 'JavaScript Fundamentals',
      icon: <Code className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">Key JavaScript concepts demonstrated:</p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Hoisting Example:</h4>
            <code className="text-sm text-gray-800 block whitespace-pre">{`// Variable hoisting (var vs let/const)
console.log(typeof hoistedVar); // undefined (not error)
var hoistedVar = "I'm hoisted!";

// Function hoisting
console.log(hoistedFunction()); // Works! Returns "Hello"
function hoistedFunction() {
  return "Hello from hoisted function!";
}

// Modern const/let are not hoisted the same way
// console.log(modernVar); // ReferenceError
const modernVar = "Modern JavaScript";`}</code>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Event Loop:</strong> Demonstrated in useDebounce and mockApi</li>
            <li><strong>Closures:</strong> Used in custom hooks and Context providers</li>
            <li><strong>Async/Await:</strong> Modern promise handling throughout the app</li>
            <li><strong>Arrow Functions:</strong> Lexical 'this' binding in components</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Learning Guide</h2>
      </div>
      
      <div className="space-y-4">
        {sections.map(section => (
          <div key={section.id} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                {section.icon}
                <span className="ml-3 font-semibold text-gray-900">{section.title}</span>
              </div>
              {expandedSections.has(section.id) ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {expandedSections.has(section.id) && (
              <div className="px-4 pb-4 border-t border-gray-200">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};