import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import HomePage from './Components/HomePage/HomePage'
import Authentication from './Components/Authentications/Authentication'
import ProtectedRoute from './Components/Common/ProtectedRoute'
import ErrorBoundary from './Components/Common/ErrorBoundary'
import Explore from './Components/ExploreSection/Explore'
import Bookmarks from './Components/ExploreSection/Bookmarks'
import Notifications from './Components/ExploreSection/Notifications'
import Settings from './Components/ExploreSection/Settings'
import FeaturePage from './Components/ExploreSection/FeaturePage'
import HomeSection from './Components/HomeSection/HomeSection'
import Profile from './Components/Profile/Profile'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path='/auth' element={<Authentication />} />

            {/* Protected Routes */}
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <HomePage>
                    <HomeSectionRoute />
                  </HomePage>
                </ProtectedRoute>
              }
            />
            <Route
              path='/explore'
              element={
                <ProtectedRoute>
                  <HomePage>
                    <Explore />
                  </HomePage>
                </ProtectedRoute>
              }
            />
            <Route
              path='/bookmarks'
              element={
                <ProtectedRoute>
                  <HomePage>
                    <Bookmarks />
                  </HomePage>
                </ProtectedRoute>
              }
            />
            <Route
              path='/notifications'
              element={
                <ProtectedRoute>
                  <HomePage>
                    <Notifications />
                  </HomePage>
                </ProtectedRoute>
              }
            />
            <Route
              path='/settings'
              element={
                <ProtectedRoute>
                  <HomePage>
                    <Settings />
                  </HomePage>
                </ProtectedRoute>
              }
            />
            <Route
              path='/messages'
              element={
                <ProtectedRoute>
                  <HomePage>
                    <FeaturePage title='Messages' subtitle='Private conversations'>
                      Direct messages will appear here once the messaging API is connected.
                    </FeaturePage>
                  </HomePage>
                </ProtectedRoute>
              }
            />
            <Route
              path='/grok'
              element={
                <ProtectedRoute>
                  <HomePage>
                    <FeaturePage title='Grok' subtitle='AI assistant space'>
                      Add AI search, summaries, or assistant features here when you are ready.
                    </FeaturePage>
                  </HomePage>
                </ProtectedRoute>
              }
            />
            <Route
              path='/lists'
              element={
                <ProtectedRoute>
                  <HomePage>
                    <FeaturePage title='Lists' subtitle='Curated timelines'>
                      Lists can group people and posts into custom focused timelines.
                    </FeaturePage>
                  </HomePage>
                </ProtectedRoute>
              }
            />
            <Route
              path='/communities'
              element={
                <ProtectedRoute>
                  <HomePage>
                    <FeaturePage title='Communities' subtitle='Topic-based groups'>
                      Community feeds, members, and moderation tools can live here.
                    </FeaturePage>
                  </HomePage>
                </ProtectedRoute>
              }
            />
            <Route
              path='/premium'
              element={
                <ProtectedRoute>
                  <HomePage>
                    <FeaturePage title='Premium' subtitle='Subscription features'>
                      Verified styling, analytics, and creator features can be added here.
                    </FeaturePage>
                  </HomePage>
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/:id'
              element={
                <ProtectedRoute>
                  <HomePage>
                    <Profile />
                  </HomePage>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path='/*' element={<Navigate to='/' replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

function HomeSectionRoute() {
  return <HomeSection />
}

export default App
