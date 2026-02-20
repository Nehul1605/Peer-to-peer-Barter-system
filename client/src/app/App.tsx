import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'sonner';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import SkillProfile from './pages/dashboard/SkillProfile';
import Matching from './pages/dashboard/Matching';
import Sessions from './pages/dashboard/Sessions';
import Credits from './pages/dashboard/Credits';

/**
 * SkillBarter - Peer-to-Peer Skill Exchange Platform
 * 
 * Main application with routing for:
 * - Landing page
 * - Authentication (Login/Signup)
 * - Dashboard with skill matching, sessions, and credits
 */
export default function App() {
  // Mock authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Toaster position="top-right" richColors />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/login" 
            element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} 
          />
          <Route 
            path="/signup" 
            element={<SignupPage onSignup={() => setIsAuthenticated(true)} />} 
          />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <DashboardLayout onLogout={() => setIsAuthenticated(false)} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<SkillProfile />} />
            <Route path="matching" element={<Matching />} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="credits" element={<Credits />} />
          </Route>

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}