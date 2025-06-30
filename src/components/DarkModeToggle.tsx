import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '@/contexts/ThemeContext';

interface DarkModeToggleProps {
  variant?: 'sidebar' | 'header';
}

const DarkModeToggle = ({ variant = 'sidebar' }: DarkModeToggleProps) => {
  const { isDark, toggleTheme } = useTheme();

  if (variant === 'header') {
    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDark ? (
          <LightModeIcon className="text-[20px]" />
        ) : (
          <DarkModeIcon className="text-[20px]" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors duration-200"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <LightModeIcon className="text-[20px]" />
      ) : (
        <DarkModeIcon className="text-[20px]" />
      )}
    </button>
  );
};

export default DarkModeToggle;
