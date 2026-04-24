import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MapPage from './pages/MapPage'
import CollectionPage from './pages/CollectionPage'
import RequestPage from './pages/RequestPage'
import ReviewPage from './pages/ReviewPage'
import AccountPage from './pages/AccountPage'
import AdminPage from './pages/AdminPage'
import PostStep1Page from './pages/PostStep1Page'
import PostStep2Page from './pages/PostStep2Page'
import PostStep3Page from './pages/PostStep3Page'
import PostStep4Page from './pages/PostStep4Page'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/map" element={<MapPage />} />
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="/request/:id" element={<RequestPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/post/1" element={<PostStep1Page />} />
              <Route path="/post/2" element={<PostStep2Page />} />
              <Route path="/post/3" element={<PostStep3Page />} />
              <Route path="/post/4" element={<PostStep4Page />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Route>

            {/* Catch-all for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  )
}
