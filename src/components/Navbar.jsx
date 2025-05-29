// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      {/* Navigation links to major modules */}
      <Link to="/">Dashboard</Link>
      <Link to="/employees">Employees</Link>
      <Link to="/leave">Leave</Link>
      <Link to="/schedule">Schedule</Link>
      <Link to="/training">Training</Link>
      <Link to="/reviews">Reviews</Link>
      <Link to="/recognition">Recognition</Link>
      <Link to="/offboarding">Offboarding</Link>
    </nav>
  );
}

export default Navbar;
