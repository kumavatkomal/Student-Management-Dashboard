// Main App component with error boundary and context provider
import React, { useState } from 'react';
import { StudentProvider } from './context/StudentContext';
import { Dashboard } from './components/Dashboard';
import { MentoringGuide } from './components/MentoringGuide';
import { ErrorBoundary } from './components/ErrorBoundary';
import { BookOpen, LayoutDashboard } from 'lucide-react';

/**
 * Main App component - demonstrates application structure and error handling
 * Shows how to organize a React application with proper separation of concerns
 */
function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'guide'>('dashboard');

  return (
    <ErrorBoundary>
      <StudentProvider>
        <div className="min-h-screen bg-gray-50">
          {/* Navigation Tabs */}
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex space-x-8">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                    currentView === 'dashboard'
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('guide')}
                  className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                    currentView === 'guide'
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Learning Guide
                </button>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main>
            {currentView === 'dashboard' ? (
              <Dashboard />
            ) : (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <MentoringGuide />
              </div>
            )}
          </main>
        </div>
      </StudentProvider>
    </ErrorBoundary>
  );
}

export default App;