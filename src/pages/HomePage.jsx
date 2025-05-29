// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to HRMS</h1>
      <p className="text-gray-600">Please select your login type:</p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/admin-login')}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login as Admin/HR
        </button>
        <button
          onClick={() => navigate('/employee-login')}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Login as Employee
        </button>
      </div>
    </div>
  );
};

export default HomePage;
