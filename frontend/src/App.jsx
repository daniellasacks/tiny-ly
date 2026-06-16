import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BabyProfilePage from './pages/BabyProfilePage';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/baby/:babyId" element={<ProtectedRoute><BabyProfilePage /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
