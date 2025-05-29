// src/pages/AdminLoginPage.jsx
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setError(error.message);
    
    // Redirect based on user metadata or role
    const { user } = data;
    const role = user.user_metadata.role;
    if (role === 'admin' || role === 'hr' || role === 'manager') {
      navigate('/admin/dashboard');
    } else {
      setError('Access denied. This portal is for Admin/HR/Manager only.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow-md rounded w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin/HR/Manager Login</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
