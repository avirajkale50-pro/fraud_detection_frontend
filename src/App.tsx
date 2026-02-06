import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './feature/home/HomePage';
import LoginPage from './feature/auth/LoginPage';
import SignupPage from './feature/auth/SignupPage';
import TransactionList from './feature/transaction/TransactionList';
import TransactionDetail from './feature/transaction/TransactionDetail';
import TransactionSummary from './feature/transaction/TransactionSummary';
import ProtectedRoute from './router/ProtectedRoute';
import PublicRoute from './router/PublicRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

// Component to handle root path redirect
const RootRedirect = () => {
  const { isAuthenticated } = useAuth();
  console.log('[RootRedirect] Rendering, isAuthenticated:', isAuthenticated, 'Current path:', window.location.pathname);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <HomePage />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RootRedirect />} />
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<TransactionList />} />
              <Route path="summary" element={<TransactionSummary />} />
              <Route path="transactions/:id" element={<TransactionDetail />} />
            </Route>
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
