import { Link as RouterLink } from 'react-router-dom';
import DarkModeToggle from '../DarkModeToggle';

const Navbar = () => {
  return (
    <div className="flex-grow">
      <nav className="bg-white dark:bg-gray-800 shadow-sm py-4 relative border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-grow">
              <RouterLink to="/" className="no-underline">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Clean YouTube
                </h1>
              </RouterLink>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Free of ads, comments, and other distractions.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <RouterLink
                to="/bookmark-demo"
                className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors no-underline"
              >
                🔖 Bookmark Demo
              </RouterLink>
              <DarkModeToggle variant="header" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
