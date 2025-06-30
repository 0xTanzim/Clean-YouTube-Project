# 🎬 Clean YouTube Project

> A distraction-free YouTube learning experience built with modern React architecture

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## ✨ Features

### 🎯 **Core Features**

- **🚫 Ad-Free Experience**: Clean video playback without interruptions
- **📝 Comment-Free Focus**: Distraction-free learning environment
- **📚 Playlist Management**: Organize your educational content with professional UI
- **⭐ Favorites System**: Save your most important playlists
- **🕒 Recent History**: Quick access to recently viewed content
- **🌙 Dark/Light Mode**: Full adaptive theme support with Tailwind CSS
- **📱 Responsive Design**: Works seamlessly across all devices

### 🎮 **Enhanced User Experience**

- **🎵 Continuous Playback**: Auto-advance through playlist videos
- **📍 Progress Tracking**: Resume where you left off with visual indicators
- **� Smart Bookmarks**: Create, manage, and export video bookmarks
- **⚡ Udemy-Style Navigation**: Previous/Next buttons with hover effects
- **⌨️ Keyboard Shortcuts**: Power user navigation
- **♿ Accessibility**: Full WCAG 2.1 AA compliance

### 🔧 **Technical Excellence**

- **⚡ Performance Optimized**: React 19, lazy loading, code splitting
- **🛡️ Error Boundaries**: Graceful error handling throughout
- **💾 Local Storage**: Persistent user preferences and progress
- **🎨 Modern Design**: Professional UI with smooth animations
- **📊 Bundle Optimized**: < 500KB gzipped production build

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **pnpm** (recommended) or npm
- **YouTube Data API v3** key

### Installation

```bash
# Clone the repository
git clone https://github.com/0xTanzim/Clean-YouTube-Project.git
cd Clean-YouTube-Project

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# Add your YouTube API key to .env.local

# Start development server
pnpm dev
```

### 🔑 Environment Setup

Create a `.env.local` file:

```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
```

**Get your API key**: [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

## 🛠️ Tech Stack

### **Frontend Core**

- **React 19** - Latest UI library with modern features
- **TypeScript** - 100% type safety and developer experience
- **Vite 7.0** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS with full dark mode

### **State Management & Logic**

- **Easy Peasy** - Redux-based state management
- **Custom Hooks** - Reusable stateful logic patterns
- **Service Layer** - Clean business logic separation

### **UI/UX & Design**

- **Material-UI** - Professional component library
- **Custom Components** - Udemy-style video controls
- **Responsive Design** - Mobile-first approach
- **Dark/Light Themes** - System preference aware

### **Development Tools**

- **ESLint** - Code quality and consistency
- **Prettier** - Automatic code formatting
- **Husky** - Git hooks for quality gates
- **TypeScript Strict** - Maximum type safety

## 📖 Usage Guide

### 🎬 **Video Player Features**

- **Udemy-Style Controls**: Hover over video to reveal Previous/Next buttons
- **Professional Interface**: Modern video info overlay with gradient background
- **Smart Bookmarks**: Create bookmarks at current timestamp
- **Progress Tracking**: Visual completion indicators and resume functionality

### � **Playlist Management**

1. **Add Playlists**: Click "Add Playlist" and paste YouTube URL or ID
2. **Beautiful Sidebar**: Modern playlist navigation with thumbnails
3. **Progress Visualization**: Color-coded completion status
4. **Favorites**: Star playlists for quick access

### 🔖 **Bookmark System**

- **Create**: Click bookmark button during video playback
- **Manage**: Professional bookmark manager with export functionality
- **Timeline**: Visual bookmark indicators on video progress
- **Export**: Download bookmarks as formatted markdown

### ⌨️ **Keyboard Shortcuts**

- `Space` - Play/Pause video
- `→` - Next video in playlist
- `←` - Previous video
- `F` - Toggle fullscreen
- `M` - Mute/unmute
- `B` - Create bookmark at current time

### 🌙 **Theme Support**

- **Auto-Detection**: Respects system dark/light preference
- **Manual Toggle**: Switch themes with navbar button
- **Consistent Design**: All components support both themes
- **Professional Colors**: Carefully crafted color palette

## 🎨 **Design System**

### **Component Architecture**

- **Smart/Dumb Pattern**: Clear separation of logic and presentation
- **Compound Components**: Advanced React patterns (see PlayerPageClean)
- **Composition**: Flexible, reusable component structure
- **Type Safety**: Full TypeScript coverage with proper interfaces

### **Performance Optimizations**

- **React.memo**: Optimized component re-rendering
- **Lazy Loading**: Code splitting for better initial load
- **Image Optimization**: Efficient thumbnail loading with fallbacks
- **Bundle Analysis**: Optimized dependency management

## 🚀 **Available Scripts**

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Production build
pnpm preview      # Preview production build
pnpm type-check   # TypeScript validation

# Code Quality
pnpm lint         # ESLint check
pnpm lint:fix     # Fix ESLint issues
pnpm format       # Prettier formatting

# Testing (planned)
pnpm test         # Unit tests
pnpm test:e2e     # End-to-end tests
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Development Workflow**

```bash
# 1. Fork and clone
git clone https://github.com/your-username/Clean-YouTube-Project.git

# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Make changes and commit using conventional commits
git commit -m "feat: add amazing feature"

# 4. Push and create PR
git push origin feature/amazing-feature
```

### **Code Standards**

- ✅ **TypeScript** - All code must be properly typed
- ✅ **ESLint** - Follow project linting rules
- ✅ **Conventional Commits** - Use semantic commit messages
- ✅ **Component Patterns** - Follow established architecture
- ✅ **Dark Mode** - All new UI must support both themes

## 📊 **Project Stats**

- **Components**: 20+ reusable, type-safe components
- **Type Coverage**: 100% TypeScript with strict mode
- **Performance**: 95+ Lighthouse score target
- **Accessibility**: WCAG 2.1 AA compliant
- **Bundle Size**: < 500KB gzipped (optimized)
- **Browser Support**: Modern browsers with ES2020+

## 🎯 **Recent Improvements**

### **✅ Major UI/UX Enhancements (June 2025)**

- **Professional Video Player**: Udemy-style navigation with hover controls
- **Modern Dark/Light Themes**: Complete Tailwind CSS integration
- **Enhanced Playlist Sidebar**: Beautiful design with smooth animations
- **Advanced Bookmark System**: Timeline integration with export functionality
- **Mobile-First Design**: Responsive layout for all screen sizes
- **Error Handling**: Comprehensive error boundaries and fallbacks

### **✅ Technical Upgrades**

- **React 19**: Latest React features and performance improvements
- **Vite 7.0**: Faster build times and improved dev experience
- **TypeScript Strict**: Maximum type safety and code quality
- **Modern Architecture**: Clean code patterns and component composition

## � **Known Issues & Roadmap**

- 🔄 **In Progress**: Server-side rendering (SSR) support
- 📋 **Planned**: React Query integration for better data management
- 🎬 **Planned**: Video speed controls and quality selection
- 📱 **Planned**: Progressive Web App (PWA) features

See [Issues](https://github.com/0xTanzim/Clean-YouTube-Project/issues) for detailed roadmap.

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **YouTube Data API v3** - Providing access to playlist data
- **React Team** - Amazing framework and ecosystem
- **Material-UI** - Professional component library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite Team** - Lightning-fast build tooling
- **Open Source Community** - Inspiration and best practices

## 🔗 **Links**

- **🌐 Live Demo**: [https://clean-youtube-project.netlify.app](https://clean-youtube-project.netlify.app)
- **📊 GitHub Repository**: [https://github.com/0xTanzim/Clean-YouTube-Project](https://github.com/0xTanzim/Clean-YouTube-Project)
- **📚 Documentation**: [Project Wiki](https://github.com/0xTanzim/Clean-YouTube-Project/wiki)
- **� Report Issues**: [GitHub Issues](https://github.com/0xTanzim/Clean-YouTube-Project/issues)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/0xTanzim">Tanzim Hossain</a></p>
  <p>⭐ <strong>Star this repo if you find it helpful!</strong></p>

  <p><em>Building the future of distraction-free learning 🚀</em></p>
</div>
