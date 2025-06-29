import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuBar from './MenuBar';
import SideNav from './SideNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [menuBarTrig, setMenuBarTrig] = useState(true);
  const location = useLocation();

  // Check if current page is player page
  const isPlayerPage = location.pathname.startsWith('/player');

  useEffect(() => {
    if (window.innerWidth < 576) {
      setMenuBarTrig(false);
    }
  }, [window.innerWidth]);

  const handleMenuBarTrig = () => {
    if (menuBarTrig) {
      setMenuBarTrig(false);
    } else {
      setMenuBarTrig(true);
    }
  };

  // For player page, render without layout
  if (isPlayerPage) {
    return <div className="player-page">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SideNav handleMenuBarTrig={handleMenuBarTrig} />
      <MenuBar menuBarTrig={menuBarTrig} />
      <div
        className={`mx-10 ml-[110px] max-sm:mx-2.5 max-sm:ml-[70px] transition-all duration-300 ${
          menuBarTrig ? 'ml-[330px] max-sm:ml-[90px]' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
