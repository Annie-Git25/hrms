// routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx'; // Landing page
import AdminLoginPage from '../pages/AdminLoginPage.jsx';
import EmployeeLoginPage from '../pages/EmployeeLoginPage.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import HomePage from '../pages/HomePage'; // Landing page
import AdminLoginPage from '../pages/AdminLoginPage';
import EmployeeLoginPage from '../pages/EmployeeLoginPage';
import AdminDashboard from '../pages/AdminDashboard';
import { useAuth } from '../context/AuthContext';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<HomePage />} />

        {/* Login Pages */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/employee-login" element={<EmployeeLoginPage />} />

        {/* Protected Admin Route */}
        {user && user.role === 'admin' && (
          <Route path="/admin" element={<AdminDashboard />} />
        )}

        {/* Protected Employee Route */}
        {user && user.role === 'employee' && (
          <Route path="/employee" element={<EmployeeDashboard />} />
        )}

        {/* Optional fallback: redirect unknown paths */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
