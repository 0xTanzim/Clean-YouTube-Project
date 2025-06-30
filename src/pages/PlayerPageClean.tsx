import { Player } from '@/components/compound/Player';
import { PlayerProvider } from '@/contexts/PlayerContext';

/**
 * PlayerPage - Ultra Clean Implementation
 *
 * Advanced React Patterns Used:
 * ✅ Provider Pattern - Centralized state management
 * ✅ Compound Components - Logical UI sections
 * ✅ Custom Hooks - Logic separation and reusability
 * ✅ Path Aliases - Clean imports with @/ syntax
 * ✅ Single Responsibility - Each component has one job
 * ✅ Composition over Inheritance - Flexible architecture
 * ✅ Facade Pattern - Simple interface to complex subsystems
 *
 * Benefits:
 * 🔧 Easy to debug - Logic is separated by concern
 * 📖 Highly readable - Clear component structure
 * 🧪 Testable - Each hook and component can be tested independently
 * 🔄 Maintainable - Changes are isolated to specific areas
 * 🚀 Scalable - Easy to add new features
 */
const PlayerPage = () => {
  return (
    <PlayerProvider>
      <Player.Layout>
        <Player.VideoSection />
        <Player.SidebarSection />
        <Player.BookmarkSection />
      </Player.Layout>
    </PlayerProvider>
  );
};

export default PlayerPage;
