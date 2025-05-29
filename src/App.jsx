// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
//import EmployeePage from './pages/EmployeePage';
//import LeavePage from './pages/LeavePage';
import ScheduleScheduling from './pages/StaffScheduling';
import TrainingManagement from './pages/TrainingManagement';
//import ReviewPage from './pages/ReviewPage';
//import RecognitionPage from './pages/RecognitionPage';
//import OffboardingPage from './pages/OffboardingPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Route paths map to respective modules */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/leave" element={<LeavePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/recognition" element={<RecognitionPage />} />
        <Route path="/offboarding" element={<OffboardingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
