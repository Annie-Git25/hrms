// routes/AppRoutes.jsx
// REMOVE: import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'; // ONLY import Routes and Route
import HomePage from '../pages/HomePage.jsx'; // Landing page
import AdminLoginPage from '../pages/AdminLoginPage.jsx';
import EmployeeLoginPage from '../pages/EmployeeLoginPage.jsx';
import Dashboard from '../pages/Dashboard.jsx'; // Assuming this is for generic dashboard or you have specific ones
import AdminDashboard from '../pages/AdminDashboard.jsx'; // Make sure these are imported
import EmployeeDashboard from '../pages/EmployeeDashboard.jsx'; // Make sure these are imported
import { useAuth } from '../context/AuthContext.jsx';


function AppRoutes() {
  const { user } = useAuth(); // useAuth still works because AuthContext is higher up

  return (
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
      {/* If you add a NotFound component, make sure to import it */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default AppRoutes;