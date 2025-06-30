# 📋 Copilot Instructions for Clean YouTube Project

These rules define the coding standards, component architecture, and best practices for the **Clean YouTube Project**, a distraction-free YouTube learning platform built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Easy Peasy** state management. Follow these guidelines to ensure code consistency, maintainability, and alignment with the project's clean architecture principles.

## 🔰 1. General Code Quality Principles

- Write **clean**, **readable**, and **maintainable** code.
- ❌ Avoid: dead code, commented-out logic, inline spaghetti code, or excessive nesting.
- ✅ Ensure: consistency, type safety, separation of concerns, and meaningful naming (e.g., `PlaylistCard`, `useVideoPlayback`).
- Follow **clean architecture** principles as outlined in the project's `README.md`.

## 📜 2. Component Design Rules

### ✅ Follow Single Responsibility Principle (SRP)

- Each component must have **one clear responsibility** (e.g., rendering a playlist, handling video playback).
- Split components if they handle multiple roles:
  - **UI**: Presentational (Dumb) components for rendering.
  - **Logic**: Move to custom hooks (`hooks/`) or services (`services/`).

### 🧠 Dumb vs Smart Components

| Type                         | Role                                                                   | Example                                     |
| ---------------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| 🧼 **Dumb (Presentational)** | Focus on UI, accepts data via props, minimal/no state.                 | `PlaylistCard`, `VideoPlayer`               |
| ⚙️ **Smart (Container)**     | Handles logic (state, API calls, effects), connects to services/hooks. | `PlaylistContainer`, `VideoPlaybackManager` |

- ✅ Use **Dumb components** for reusability and testability.
- ✅ Keep **Smart components** thin by moving logic to hooks (`usePlaylist`, `useVideoBookmarks`) or services (`playlistService.ts`).

### 🧱 Ideal Component Breakdown

Example for a playlist page:

```tsx
<PlaylistPage>
  <Header /> // Global navigation
  <PlaylistHero /> // Playlist title, thumbnail
  <VideoList /> // List of videos in playlist
  <VideoPlayer /> // Video playback UI
  <BookmarkList /> // Bookmarked timestamps
  <Footer /> // Global footer
</PlaylistPage>
```

- Each component is a **Dumb component** unless it requires state or API interaction.

### ✅ When to Create a New Component

| Condition            | Description                                 | Priority |
| -------------------- | ------------------------------------------- | -------- |
| 🔁 Used in 2+ Places | Reusable UI/logic (e.g., `VideoCard`)       | ⭐⭐⭐   |
| 📏 JSX > 80–100 LOC  | Large JSX blocks for clarity                | ⭐⭐     |
| 🧠 Contains Logic    | State, effects, or API calls                | ⭐⭐⭐⭐ |
| 🧩 Semantic Unit     | Distinct UI block (e.g., `BookmarkItem`)    | ⭐⭐     |
| 🧼 Violates SRP      | Mixing UI and logic                         | ⭐⭐⭐   |
| 🧪 Testable Block    | Isolated for unit testing                   | ⭐⭐     |
| 🚀 Lazy Loadable     | Optimize performance (e.g., `BookmarkList`) | ⭐⭐     |
| 🪟 Multiple States   | Complex conditional rendering               | ⭐⭐⭐   |

### ❌ When Not to Create a New Component

| Condition               | Reason                               |
| ----------------------- | ------------------------------------ |
| 👻 Used Only Once       | Avoid over-abstraction               |
| 💅 Style-Only Wrapper   | Simple `<div>` with Tailwind classes |
| 🧱 Re-exporting UI      | Re-exporting Material-UI components  |
| 🚫 Static Markup        | No logic/props, pure static content  |
| 🥄 Children Passthrough | Wrapper with only `{children}`       |

## 🧩 3. React Design Patterns

| Pattern                    | Use Case                                             | Benefits            | Example                                   |
| -------------------------- | ---------------------------------------------------- | ------------------- | ----------------------------------------- |
| 🧱 **HOC**                 | Cross-cutting concerns (e.g., analytics, auth)       | Code reuse          | `withAnalytics(VideoPlayer)`              |
| 🧬 **Compound Components** | Related UI components (e.g., `VideoPlayer.Controls`) | Declarative API     | `<VideoPlayer.Controls />`                |
| 🧩 **Composition**         | Structuring complex UI                               | Modular, readable   | `<Card><CardHeader /><CardBody /></Card>` |
| 🔁 **Render Props**        | Dynamic rendering with shared logic                  | Flexibility         | `<VideoPlayer renderControls={...} />`    |
| 🧠 **Context Provider**    | Global state (theme, user preferences)               | Avoid prop drilling | `ThemeProvider`, `PlaylistProvider`       |

## 🧼 4. Component Clean-Up Checklist

- ❌ Avoid defining functions inside render; use hooks or external functions.
- ✅ Extract logic to custom hooks (e.g., `useVideoBookmarks`, `usePlaybackSpeed`).
- ✅ Break large JSX into smaller components (e.g., `<VideoControls />`, `<PlaylistSidebar />`).
- ❌ Avoid complex inline conditionals; use early returns or helper components.
- ✅ All components must be **typed** with TypeScript.

## 🧠 5. Hooks & Logic Abstraction

- **Never put logic in UI components.** Move to:
  - `services/` for API calls and business logic (e.g., `playlistService.ts`).
  - `hooks/` for stateful logic (e.g., `usePlaylistFetch.ts`).
  - `lib/` for utility functions (e.g., `formatTimestamp.ts`).
- ✅ Example:

```tsx
// ❌ BAD
const VideoList = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then(setVideos);
  }, []);
  return (
    <ul>
      {videos.map((v) => (
        <li>{v.title}</li>
      ))}
    </ul>
  );
};

// ✅ GOOD
const VideoList = () => {
  const { videos } = usePlaylistVideos();
  return (
    <ul>
      {videos.map((v) => (
        <li>{v.title}</li>
      ))}
    </ul>
  );
};
```

## ⚙️ 6. Vite-Specific Rules

- Use **Vite’s fast refresh** for development efficiency.
- Leverage **Vite’s code splitting** for lazy loading:
  ```tsx
  const BookmarkList = React.lazy(() => import('./components/BookmarkList'));
  ```
- Optimize bundle size with **Vite’s optimization features** (tree-shaking, minification).
- Use **Vite’s environment variables** (e.g., `VITE_YOUTUBE_API_KEY` in `.env.local`).
- Keep `import.meta.env` usage confined to `services/` or `api/` layers.

## 🧱 7. Composition & Layout Example

```tsx
// ❌ BAD
<div className="playlist-card">
  <div className="title">Playlist Title</div>
  <div className="video-list">{videos.map(v => <div>{v.title}</div>)}</div>
</div>

// ✅ GOOD
<PlaylistCard>
  <PlaylistHeader title="Playlist Title" />
  <VideoList videos={videos} />
</PlaylistCard>
```

- ✅ Prefer composition over deep nesting.
- ✅ Use Tailwind CSS for styling, following utility-first principles.

## 📁 8. Project Structure

Adhere to the project structure as defined in `README.md`:

```
/src
  /components
    /ui               # Reusable UI (Button, Card)
    /layout           # Layout components (Header, Footer)
    /[feature]        # Feature-specific (e.g., /playlists/VideoCard.tsx)
  /features
    /playlists
      /components     # Playlist-specific UI
      /hooks          # Playlist-specific hooks (usePlaylistFetch)
      /services       # Playlist business logic (playlistService.ts)
  /hooks             # Global hooks (useTheme, useDebounce)
  /services          # External integrations (YouTube API)
  /store
    /models          # Easy Peasy store models
    /types           # Store type definitions
  /types             # TypeScript types (Video, Playlist)
  /lib               # Utilities (formatDuration.ts)
  /constants         # App constants (API endpoints)
  /api               # API layer (YouTube API calls)
```

- Group related code by **feature** (e.g., `playlists/`), not type.
- Keep global shared utilities in `/components/ui`, `/hooks`, `/lib`.

## 🚨 9. Error Boundaries & Fallbacks

- Wrap feature sections with `<ErrorBoundary>` (e.g., `VideoPlayer`, `PlaylistList`).
- Implement component-level error states:
  ```tsx
  const { data, error } = usePlaylistFetch();
  if (error) return <ErrorCard message="Failed to load playlist" />;
  ```
- Use Material-UI components for consistent error UI.

## 🛡️ 10. Advanced TypeScript Rules

- Use `as const` for immutable constants (e.g., playback speeds).
- Prefer `interface` for public APIs (e.g., component props), `type` for internal logic.
- ❌ Ban `any`; use `unknown` with type guards.
- Use generics for reusable hooks:
  ```tsx
  function useFetch<T>(url: string): { data: T | null; error: Error | null };
  ```
- Ensure 100% TypeScript coverage as per `README.md`.

## ♿️ 11. Accessibility (WCAG 2.1 AA Compliance)

- Ensure **keyboard navigation** for all interactive components (e.g., `tabIndex`, logical focus order).
- Use **semantic HTML** (`<button>`, `<nav>`, `<article>`) over `<div>`.
- Provide **accessible labels** via `aria-label` or visually hidden text.
- ❌ Avoid `role="presentation"` on focusable elements.
- Test with screen readers (e.g., NVDA, VoiceOver).

## 🎯 12. Component Naming Tips

| Rule                 | Example                                          |
| -------------------- | ------------------------------------------------ |
| Reflect role/purpose | `VideoPlayer`, `BookmarkList`, `PlaylistSummary` |
| Avoid vague names    | ❌ `Widget`, `Box`, `Container`                  |
| Group by feature     | `/playlists/components/PlaylistCard.tsx`         |

## 🧪 13. Testing Guidelines

- Write **unit tests** for hooks and services using Jest.
- Aim for **90%+ test coverage** as per `REQUIREMENTS.md`.
- Use **Playwright** for E2E testing (planned for Phase 2).
- Test accessibility with tools like `axe-core`.

## 🎨 14. Styling with Tailwind CSS

- Use **utility-first** Tailwind classes for styling.
- Avoid inline CSS unless absolutely necessary.
- Create reusable utility classes in `components/ui` for common patterns.
- Ensure **responsive design** with Tailwind’s responsive prefixes (e.g., `sm:`, `md:`).
- Support **dark/light themes** using Tailwind’s `dark:` prefix.

## 📦 15. State Management with Easy Peasy

- Use **Easy Peasy** for global state (e.g., playlists, user preferences).
- Define store models in `store/models/`.
- Keep state logic in `store/models` or feature-specific hooks.
- Avoid local state for data that belongs in the global store (e.g., playlists, bookmarks).

## ⚡ 16. Performance Optimization

- Use **React.memo** for expensive Dumb components.
- Implement **lazy loading** for non-critical components (e.g., `BookmarkList`).
- Use **useMemo** and **useCallback** for performance-critical logic.
- Optimize bundle size to maintain `< 500KB gzipped` (per `README.md`).
- Preload critical assets (e.g., video thumbnails) using Vite’s features.

## 🛠️ 17. Development Tools

- Use **ESLint** for linting and **Prettier** for formatting.
- Follow **Conventional Commits** for commit messages.
- Use **Husky** for Git hooks to enforce standards.
- Integrate **Sentry** for error tracking (planned for Phase 2).

## 📝 18. Documentation

- Update `README.md` with new features or setup changes.
- Maintain API documentation for YouTube API integrations in `services/`.

---

## 📈 Success Metrics

- Ensure code aligns with technical performance goals from `REQUIREMENTS.md`:
  - Page Load Time: < 2 seconds
  - Time to Interactive: < 3 seconds
  - Lighthouse Score: 95+
  - Error Rate: < 0.1%

---

## 🏁 Conclusion

By following these guidelines, you will contribute to a clean, maintainable, and high-quality codebase for the Clean YouTube Project. Adhering to these principles will help ensure that the project remains scalable, testable, and aligned with the goals of providing a distraction-free learning experience on YouTube.
