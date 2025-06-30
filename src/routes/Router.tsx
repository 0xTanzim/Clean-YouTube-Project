import FavoritePlaylists from '@/components/favorite-playlists';
import Navbar from '@/components/navbar';
import RecentPlaylists from '@/components/recent-playlists';
import BookmarkDemo from '@/pages/BookmarkDemo';
import NotFound from '@/pages/Error404';
import HomePage from '@/pages/HomePage';
import PlayerPageClean from '@/pages/PlayerPageClean';
import PlayerPageOptimized from '@/pages/PlayerPageOptimized';
import SpeedControlDemo from '@/pages/SpeedControlDemo';
import { Route, Routes } from 'react-router-dom';

const Routers = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playlists" element={<HomePage />} />
        <Route path="/recents" element={<RecentPlaylists />} />
        <Route path="/favorites" element={<FavoritePlaylists />} />
        {/* Two different player implementations for testing */}
        <Route path="/player/:playlistId" element={<PlayerPageOptimized />} />
        <Route path="/player-clean/:playlistId" element={<PlayerPageClean />} />
        <Route path="/bookmark-demo" element={<BookmarkDemo />} />
        <Route path="/speed-demo" element={<SpeedControlDemo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Routers;
