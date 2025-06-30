import { Link } from 'react-router-dom';

import DarkModeToggle from '@/components/DarkModeToggle';
import AddIcon from '@mui/icons-material/Add';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ReorderIcon from '@mui/icons-material/Reorder';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useState } from 'react';

import PlayListForm from '@/components/playlist-form';

import { useStoreActions } from '@/hooks/useStore';

interface SideNavProps {
  handleMenuBarTrig: () => void;
}

const SideNav = ({ handleMenuBarTrig }: SideNavProps) => {
  const [open, setOpen] = useState(false);
  const getPlaylist = useStoreActions(
    (actions) => actions.playlists.getPlaylist
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (playlistId: string) => {
    getPlaylist(playlistId);
    handleClose();
  };

  return (
    <div className="flex flex-col justify-between items-center fixed left-0 top-0 z-[999] w-16 max-sm:w-14 h-full text-white py-5 bg-slate-700 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col items-center">
        <button
          className="text-[30px] max-sm:text-[18px] mb-4 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleMenuBarTrig}
        >
          <ReorderIcon fontSize="inherit" />
        </button>
        <Link
          to={'/playlists'}
          className="text-[30px] max-sm:text-[18px] font-bold mb-4 cursor-pointer text-white hover:opacity-80 transition-opacity"
        >
          <YouTubeIcon fontSize="inherit" />
        </Link>
        <button
          className="p-0 cursor-pointer flex items-center hover:opacity-80 transition-opacity"
          title={'Add Playlist'}
          onClick={handleClickOpen}
        >
          <AddIcon className="text-[28px] ml-0.5" />
        </button>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <DarkModeToggle />
        <div
          className="cursor-pointer flex items-center hover:opacity-80 transition-opacity"
          title={'About'}
        >
          <HelpOutlineIcon className="text-[24px]" />
        </div>
      </div>

      <PlayListForm
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default SideNav;
