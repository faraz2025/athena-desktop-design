import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useMobileDetect } from './hooks/useMobileDetect';
import MobileLandingPage from './pages/MobileLandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProjectsPage from './pages/projects/ProjectsPage';
import MaterialsPage from './pages/materials/MaterialsPage';
import LaborPage from './pages/labor/LaborPage';

function App() {
  const isMobile = useMobileDetect();

  if (isMobile) {
    return <MobileLandingPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="materials" element={<MaterialsPage />} />
          <Route path="labor" element={<LaborPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
