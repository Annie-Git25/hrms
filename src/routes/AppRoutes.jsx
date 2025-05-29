// routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import AdminDashboard from '../pages/AdminDashboard';
import { useAuth } from '../context/AuthContext';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {user && user.role === 'admin' && (
          <Route path="/admin" element={<AdminDashboard />} />
        )}
        {/* More protected routes */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
