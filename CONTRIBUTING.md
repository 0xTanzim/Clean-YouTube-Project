# 🤝 Contributing to Clean YouTube Project

Thank you for your interest in contributing to Clean YouTube Project! This document provides guidelines and information for contributors.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **pnpm** (preferred) or npm
- **Git**
- **YouTube Data API v3** key

### Development Setup

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/your-username/Clean-YouTube-Project.git
cd Clean-YouTube-Project

# 3. Install dependencies
pnpm install

# 4. Set up environment variables
cp .env.example .env.local
# Add your YouTube API key

# 5. Start development server
pnpm dev
```

## 📋 Development Guidelines

### Code Standards

#### TypeScript

- ✅ **100% TypeScript** - No JavaScript files in src/
- ✅ **Strict Mode** - Use TypeScript strict mode
- ✅ **Type Everything** - Avoid `any` types
- ✅ **Proper Interfaces** - Define clear interfaces for props and data

#### Component Architecture

- ✅ **Dumb vs Smart** - Separate UI components from logic
- ✅ **Custom Hooks** - Extract logic into reusable hooks
- ✅ **Performance** - Use React.memo for expensive components
- ✅ **Error Boundaries** - Wrap components with error handling

#### File Organization

```text
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── layout/       # Layout-specific components
│   └── [feature]/    # Feature-specific components
├── features/         # Feature modules
├── hooks/           # Custom hooks
├── services/        # API and business logic
├── store/           # State management
├── types/           # TypeScript definitions
├── lib/             # Utilities
└── constants/       # App constants
```

### Naming Conventions

#### Files & Folders

- **Components**: PascalCase (`PlaylistCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`usePlaylists.ts`)
- **Utils**: camelCase (`formatDuration.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_ENDPOINTS.ts`)

#### Variables & Functions

- **Variables**: camelCase (`playlistData`)
- **Functions**: camelCase (`handleClick`)
- **Components**: PascalCase (`PlaylistCard`)
- **Interfaces**: PascalCase with descriptive names (`PlaylistCardProps`)

### Code Style

#### React Components

```tsx
// ✅ Good - Dumb component with proper typing
interface PlaylistCardProps {
  playlist: Playlist;
  onFavorite: (id: string) => void;
}

const PlaylistCard = React.memo(
  ({ playlist, onFavorite }: PlaylistCardProps) => {
    // Component logic
    return <div className="playlist-card">{/* JSX */}</div>;
  }
);

export default PlaylistCard;
```

#### Custom Hooks

```tsx
// ✅ Good - Custom hook with proper typing
export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(false);

  // Hook logic

  return { playlists, loading, addPlaylist, removePlaylist };
};
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Testing Guidelines

- ✅ **Unit Tests** - Test individual functions and components
- ✅ **Integration Tests** - Test component interactions
- ✅ **E2E Tests** - Test user workflows
- ✅ **Accessibility Tests** - Ensure WCAG compliance

### Test Structure

```tsx
// ✅ Good test structure
describe('PlaylistCard', () => {
  const mockPlaylist = {
    id: '1',
    title: 'Test Playlist',
    // ... other props
  };

  it('should render playlist title', () => {
    render(<PlaylistCard playlist={mockPlaylist} />);
    expect(screen.getByText('Test Playlist')).toBeInTheDocument();
  });

  it('should call onFavorite when star is clicked', () => {
    const mockOnFavorite = jest.fn();
    render(
      <PlaylistCard playlist={mockPlaylist} onFavorite={mockOnFavorite} />
    );

    fireEvent.click(screen.getByLabelText('Add to favorites'));
    expect(mockOnFavorite).toHaveBeenCalledWith('1');
  });
});
```

## 🔄 Git Workflow

### Branch Naming

- **Feature**: `feature/playlist-bookmarks`
- **Bug Fix**: `fix/video-playback-issue`
- **Hotfix**: `hotfix/security-vulnerability`
- **Documentation**: `docs/contributing-guide`

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# ✅ Good commit messages
feat: add video bookmark functionality
fix: resolve playlist loading issue
docs: update contributing guidelines
style: improve button hover states
refactor: extract playlist service logic
test: add unit tests for playlist hooks
chore: update dependencies
```

### Pull Request Process

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make Changes**

   - Follow coding standards
   - Add tests for new functionality
   - Update documentation if needed

3. **Commit Changes**

   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

4. **Push to Fork**

   ```bash
   git push origin feature/amazing-feature
   ```

5. **Create Pull Request**
   - Use the PR template
   - Link related issues
   - Provide clear description
   - Add screenshots if UI changes

### PR Checklist

- [ ] Code follows project standards
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] No breaking changes (or properly documented)
- [ ] Accessibility tested
- [ ] Performance impact considered

## 🐛 Bug Reports

### Before Reporting

1. **Check existing issues** - Search for similar problems
2. **Try latest version** - Ensure you're using the latest code
3. **Minimal reproduction** - Create the smallest possible example

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**

- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]

**Additional context**
Any other context about the problem.
```

## 💡 Feature Requests

### Before Requesting

1. **Check roadmap** - See if it's already planned
2. **Search existing requests** - Avoid duplicates
3. **Consider alternatives** - Think about other solutions

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Screenshots, mockups, or other context.
```

## 🎨 Design Contributions

### UI/UX Guidelines

- **Consistency** - Follow existing design patterns
- **Accessibility** - Ensure WCAG 2.1 AA compliance
- **Responsive** - Design for mobile-first
- **Performance** - Consider loading states and animations

### Design Process

1. **Research** - Understand user needs
2. **Wireframes** - Create low-fidelity layouts
3. **Prototypes** - Build interactive mockups
4. **Feedback** - Get community input
5. **Implementation** - Work with developers

## 📚 Documentation

### Types of Documentation

- **Code Comments** - Explain complex logic
- **README Updates** - Keep installation/usage current
- **API Documentation** - Document public interfaces
- **Tutorials** - Help users learn features

### Documentation Standards

- **Clear** - Write for beginners
- **Accurate** - Keep information up-to-date
- **Examples** - Provide code samples
- **Visual** - Use screenshots and diagrams

## 🏆 Recognition

### Contributor Levels

- **First-time Contributor** - Welcome package
- **Regular Contributor** - Listed in CONTRIBUTORS.md
- **Core Contributor** - Maintainer privileges
- **Community Leader** - Special recognition

### Ways to Contribute

- 🐛 **Bug Reports** - Find and report issues
- 💡 **Feature Ideas** - Suggest improvements
- 💻 **Code** - Implement features and fixes
- 📚 **Documentation** - Improve guides and docs
- 🎨 **Design** - Create UI/UX improvements
- 🧪 **Testing** - Write and improve tests
- 💬 **Community** - Help other users

## ❓ Getting Help

### Resources

- **GitHub Discussions** - General questions and ideas
- **Discord Server** - Real-time chat with community
- **Documentation** - Comprehensive guides
- **Stack Overflow** - Technical programming questions

### Contact

- **General Questions**: [GitHub Discussions](https://github.com/0xTanzim/Clean-YouTube-Project/discussions)
- **Bug Reports**: [GitHub Issues](https://github.com/0xTanzim/Clean-YouTube-Project/issues)
- **Security Issues**: [security@clean-youtube.dev](mailto:security@clean-youtube.dev)
- **Maintainer**: [@0xTanzim](https://github.com/0xTanzim)

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of:

- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience, education, socio-economic status
- Nationality, personal appearance, race, religion
- Sexual identity and orientation

### Our Standards

#### Positive Behavior

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

#### Unacceptable Behavior

- Trolling, insulting/derogatory comments, personal attacks
- Public or private harassment
- Publishing private information without permission
- Other conduct inappropriate in a professional setting

### Enforcement

Report unacceptable behavior to [conduct@clean-youtube.dev](mailto:conduct@clean-youtube.dev). All reports will be reviewed and investigated promptly and fairly.

---

## 🎉 Thank You!

Your contributions make this project better for everyone. Whether you're fixing a typo, reporting a bug, or implementing a major feature, every contribution is valued and appreciated!

**Happy Contributing! 🚀**
