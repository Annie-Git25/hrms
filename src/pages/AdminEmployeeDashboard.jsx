// src/pages/AdminEmployeeDashboard.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

function AdminEmployeeDashboard() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, [selectedDept]);

  const fetchEmployees = async () => {
    let query = supabase.from('employees').select('*');
    if (selectedDept !== 'All') {
      query = query.eq('department', selectedDept);
    }
    const { data, error } = await query;
    if (!error) setEmployees(data);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const { data, error } = await supabase.from('employees').select('department');
    if (!error) {
      const uniqueDepts = [...new Set(data.map(emp => emp.department))];
      setDepartments(uniqueDepts);
    }
  };

  const handleViewProfile = (id) => {
    navigate(`/employee/${id}`); // Redirect to profile page
  };

  const handleEditEmployee = (id) => {
    navigate(`/employee/edit/${id}`); // Redirect to edit form page
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Employee Dashboard</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Department:</label>
        <select
          className="border p-2 rounded"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="All">All</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Department</th>
            <th className="border p-2 text-left">Contact</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50">
              <td className="border p-2">{emp.name}</td>
              <td className="border p-2">{emp.email}</td>
              <td className="border p-2">{emp.department}</td>
              <td className="border p-2">{emp.contact}</td>
              <td className="border p-2">{emp.status || 'Active'}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleViewProfile(emp.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditEmployee(emp.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminEmployeeDashboard;
