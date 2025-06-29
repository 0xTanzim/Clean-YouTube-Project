import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Link, useMatch } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

interface MenuBarProps {
  menuBarTrig?: boolean;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

// COPILOT: Dumb component for navigation items - reusable and props-driven
const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  const baseClasses =
    'flex items-center py-2 px-2.5 mb-1 cursor-pointer transition-all duration-300 no-underline text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400';
  const activeClasses =
    'bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400';

  return (
    <li>
      <Link
        to={to}
        className={`${baseClasses} ${isActive ? activeClasses : ''}`}
      >
        <span className="text-[26px] mr-2.5 transition-all duration-300">
          {icon}
        </span>
        <span className="text-base mb-1 transition-all duration-300">
          {label}
        </span>
      </Link>
    </li>
  );
};

// Navigation configuration - moved to data layer
const navigationItems = [
  { to: '/', icon: <HomeIcon />, label: 'Home' },
  { to: '/recents', icon: <WatchLaterIcon />, label: 'Recents' },
  { to: '/playlists', icon: <PlaylistPlayIcon />, label: 'Playlists' },
  {
    to: '/favorites',
    icon: <FavoriteBorderOutlinedIcon />,
    label: 'Favorites',
  },
];

const MenuBar = ({ menuBarTrig }: MenuBarProps) => {
  return (
    <div
      className="bg-gray-50 dark:bg-gray-800 p-2.5 w-45 h-full fixed left-16 max-sm:left-14 top-0 border-r border-gray-200 dark:border-gray-700 z-[9999] transition-all duration-300"
      style={
        !menuBarTrig
          ? { left: '-220px', transform: 'translateX(100)' }
          : undefined
      }
    >
      {/* Header Section */}
      <Link to="/" className="no-underline">
        <div className="flex items-center mb-8 pb-2.5 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 cursor-pointer">
          <img
            src={logo}
            alt="Clean YouTube Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-[15.5px] font-semibold">Clean YouTube</span>
        </div>
      </Link>

      {/* Navigation Section */}
      <nav>
        <ul className="-ml-3 p-2 list-none">
          {navigationItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={Boolean(useMatch(item.to))}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MenuBar;
