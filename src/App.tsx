import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import MainLayout from './components/MainLayout';
import VerifySession from './components/common/VerifySession';
import EmailVerificationRequired from './components/guards/EmailVerificationRequired';
import ProtectedRoute from './components/guards/ProtectedRoute';
import { PublicRoute } from './components/guards/PublicRoute';
import LoginPage from './features/auth/pages/LoginPage';
import VerifyEmailCodePage from './features/auth/pages/VerifyEmailCodePage';
import VerifyEmailPage from './features/auth/pages/VerifyEmailPage';
import OnboardingPage from './features/onboarding/pages/OnboardingPage';
import { useMobileDetect } from './hooks/useMobileDetect';
import MobileLandingPage from './pages/MobileLandingPage';
import RecentActivityPage from './pages/activity/RecentActivityPage';
import ChatPage from './pages/chat/ChatPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import DocumentsPage from './pages/documents/DocumentsPage';
import ExpensesPage from './pages/expenses/ExpensesPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import ProfilePage from './pages/profile/ProfilePage';
import CreateProjectPage from './pages/projects/CreateProjectPage';
import ProjectsPage from './pages/projects/ProjectsPage';
import ReportsPage from './pages/reports/ReportsPage';
import SettingsPage from './pages/settings/SettingsPage';
import SubscriptionPage from './pages/subscription/SubscriptionPage';
import AddTaskPage from './pages/tasks/AddTaskPage';
import TaskDetailPage from './pages/tasks/TaskDetailPage';
import TasksPage from './pages/tasks/TasksPage';
import VendorsPage from './pages/vendors/VendorsPage';


function App() {
  const isMobile = useMobileDetect();

  if (isMobile) {
    return <MobileLandingPage />;
  }

  return (
    <BrowserRouter>
      <VerifySession />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />


        <Route path="/verify-email" element={
          <ProtectedRoute>
            <VerifyEmailPage />
          </ProtectedRoute>
        } />

        <Route path="/verify-email/code" element={
          <ProtectedRoute>
            <VerifyEmailCodePage />
          </ProtectedRoute>
        } />


        <Route path="/onboarding" element={
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        } />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <EmailVerificationRequired>
                {/* <OnboardingRequired> */}
                <MainLayout />
                {/* </OnboardingRequired> */}
              </EmailVerificationRequired>
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/create" element={<CreateProjectPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="tasks/add" element={<AddTaskPage />} />
          <Route path="tasks/:id" element={<TaskDetailPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<ProfilePage />} />

          <Route path="chat" element={<ChatPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="activity" element={<RecentActivityPage />} />
          <Route path="vendors" element={<VendorsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster richColors />
    </BrowserRouter>
  );
}

export default App;
