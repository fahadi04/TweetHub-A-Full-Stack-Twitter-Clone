# TweetHub Frontend - Setup & Installation Guide

## Overview

TweetHub is a full-stack Twitter clone. This document covers the complete frontend setup and functionality.

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TweetHub_Frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory (copy from `.env.example`):

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

### `/src` Directory

#### **Components/**

Organized by feature/page:

- **Authentications/** - Login and signup forms
  - `Authentication.jsx` - Auth page wrapper
  - `LoginForm.jsx` - Login form component
  - `SignupForm.jsx` - Signup form with validation

- **HomePage/** - Main application layout
  - `HomePage.jsx` - Layout with navigation, feed, and sidebar

- **HomeSection/** - Tweet feed
  - `HomeSection.jsx` - Main feed component
  - `TweetComposer.jsx` - Tweet creation component
  - `TweetCard.jsx` - Individual tweet display

- **Navigation/** - Navigation sidebar
  - `Navigation.jsx` - Main navigation menu
  - `NavigationMenu.jsx` - Navigation menu items

- **Profile/** - User profile
  - `Profile.jsx` - User profile page
  - (Edit profile components TBD)

- **ExploreSection/** - Explore & discovery
  - `Explore.jsx` - Search and trending
  - `Bookmarks.jsx` - Saved tweets
  - `Notifications.jsx` - Notification feed
  - `Settings.jsx` - User settings

- **RightPart/** - Right sidebar
  - `RightPart.jsx` - Search and trends
  - `TrendMenu.jsx` - Trending topics

- **Common/** - Shared components
  - `LoadingSpinner.jsx` - Loading indicator
  - `ErrorBoundary.jsx` - Error handling
  - `ProtectedRoute.jsx` - Route protection

#### **services/**

API integration layer:

- `api.js` - Axios instance with interceptors
- `authService.js` - Authentication endpoints
- `tweetService.js` - Tweet CRUD operations
- `userService.js` - User profile operations
- `notificationService.js` - Notification endpoints

#### **context/**

Global state management:

- `AuthContext.jsx` - Authentication state
- `ThemeContext.jsx` - Dark/light mode

#### **hooks/**

Custom React hooks:

- `useAuth.js` - Access auth context
- `useTheme.js` - Access theme context
- `useTweets.js` - Tweet operations
- `useUser.js` - User operations

#### **utils/**

Helper functions:

- `formatDate.js` - Date formatting utilities
- `validation.js` - Form validation utilities
- `constants.js` - App constants

#### **styles/**

- `App.css` - Component styles
- `index.css` - Global styles with Tailwind

## Key Features Implemented

### ✅ Authentication

- Login with email/password
- Signup with validation
- Password strength indicator
- Persistent authentication (localStorage)
- Protected routes

### ✅ Tweet Management

- Create tweets (text only for now)
- View tweet feed
- Like tweets
- Retweet
- Reply to tweets
- Delete tweets
- Bookmark tweets
- Share tweets
- Tweet stats (likes, retweets, replies)

### ✅ User Profiles

- View user profile
- Edit profile information
- Follow/Unfollow users
- View follower/following lists
- User stats

### ✅ Feed Features

- Filter tweets (Latest, Popular, Following)
- Real-time like count updates
- Tweet interaction animations
- Image attachments support

### ✅ Explore Section

- Search users and tweets
- Trending topics
- User recommendations
- Hashtag search

### ✅ Notifications

- Like notifications
- Reply notifications
- Follow notifications
- Mention notifications
- Mark as read functionality

### ✅ Bookmarks

- Save tweets
- View bookmarked tweets
- Remove bookmarks
- Sort bookmarks

### ✅ Settings

- Dark/Light mode toggle
- Privacy settings
- Security settings
- Blocked accounts
- Muted accounts
- Logout

## Development Workflow

### Add a New Component

1. Create feature folder in `Components/`
2. Create component file
3. Import and use in parent component
4. Style with Tailwind CSS

### Add API Integration

1. Create service function in `services/`
2. Use in component with custom hook
3. Handle loading/error states
4. Display data

### Create Custom Hook

1. Create file in `hooks/`
2. Use hooks for state management
3. Export and use in components

## API Integration

All API calls go through the axios instance in `services/api.js`.

### Authentication Flow

```javascript
// Login
import authService from "./services/authService";
const { login } = useAuth();
await login(email, password);

// Register
await register(userData);

// Logout
await logout();
```

### Tweet Operations

```javascript
import { useTweets } from "./hooks/useTweets";
const { tweets, createTweet, likeTweet } = useTweets();

// Create tweet
await createTweet({ content, image });

// Like tweet
await likeTweet(tweetId);
```

## Component Communication

- **Global state**: Use Context API (Auth, Theme)
- **Local state**: Use useState
- **Side effects**: Use useEffect
- **Form state**: Use Formik + Yup

## Styling

### Tailwind CSS

Utility-first CSS framework:

```jsx
<div className="flex items-center gap-4 p-2 hover:bg-gray-100">Content</div>
```

### Material-UI Components

For complex components:

```jsx
<Button variant="contained" color="primary">
  Click me
</Button>
```

### CSS Modules

For component-specific styles:

```css
/* Component.module.css */
.container {
  display: flex;
  gap: 1rem;
}
```

## Error Handling

All errors are logged to console. In production:

1. Catch errors in service calls
2. Display user-friendly messages
3. Retry failed requests (optional)
4. Log to error tracking service

## Performance Optimization

- Code splitting with React.lazy()
- Image lazy loading
- Virtual scrolling for large lists (future)
- API response caching (future)
- Memoization for expensive components

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Deployment

### Build for Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Deployment Platforms

- Vercel (recommended for Vite)
- Netlify
- GitHub Pages
- Self-hosted

### Environment Variables for Production

```env
VITE_API_BASE_URL=https://api.example.com/api
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues

1. Check `VITE_API_BASE_URL` is correct
2. Verify backend is running
3. Check CORS configuration
4. Check network tab in browser DevTools

### Build Errors

```bash
# Clear build cache
rm -rf dist
npm run build
```

## Testing (Future)

```bash
npm run test
npm run test:coverage
```

## Contributing

1. Create feature branch
2. Make changes
3. Commit with descriptive messages
4. Push to branch
5. Create Pull Request

## Git Workflow

```bash
# Create and switch to feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/feature-name

# Create PR
# After approval, merge to main
```

## Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Best Practices

### Component Guidelines

- Keep components small and focused
- Use meaningful prop names
- Add PropTypes or TypeScript
- Document complex logic

### State Management

- Use Context for global state
- Keep local state in components
- Lift state when needed
- Avoid prop drilling

### Performance

- Memoize expensive computations
- Lazy load images
- Code split routes
- Use production builds

### Security

- Sanitize user input
- Don't store sensitive data in localStorage
- Use httpOnly cookies for tokens (future)
- Validate data server-side

## Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com)
- [Material-UI](https://mui.com)
- [Formik Documentation](https://formik.org)

## Support

For issues, questions, or suggestions:

1. Check documentation
2. Search existing issues
3. Create new issue with details
4. Contact development team

## License

[Specify License]

---

**Last Updated**: April 2026
**Version**: 1.0.0
