// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Your global styles
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter here

// Define your repository name here, matching it exactly (case-sensitive)
// Based on your error, it appears to be 'hrms'
const REPO_NAME = "/hrms";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* This BrowserRouter will now wrap your entire application, including AppRoutes */}
    <BrowserRouter basename={REPO_NAME}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);