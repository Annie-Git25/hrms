// src/pages/StaffScheduling.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

// Simple modal component
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 w-96 max-w-full shadow-lg">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 float-right"
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default function StaffScheduling() {
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filterDept, setFilterDept] = useState('All');
  const [filterEmployee, setFilterEmployee] = useState('All');

  // For modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingShift, setEditingShift] = useState(null);

  // Form state
  const [form, setForm] = useState({
    employee_id: '',
    department: '',
    shift_date: '',
    start_time: '',
    end_time: '',
  });

  // Fetch shifts, employees, and departments
  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchShifts();
  }, [filterDept, filterEmployee]);

  async function fetchEmployees() {
    const { data, error } = await supabase.from('employees').select('id, name, department');
    if (!error) {
      setEmployees(data);
      // Extract unique departments
      const depts = [...new Set(data.map(e => e.department))];
      setDepartments(depts);
    }
  }

  async function fetchShifts() {
    let query = supabase.from('shifts').select(`
      id,
      employee_id,
      shift_date,
      start_time,
      end_time,
      employees ( name, department )
    `).order('shift_date', { ascending: true }).order('start_time', { ascending: true });

    if (filterDept !== 'All') {
      query = query.eq('employees.department', filterDept);
    }
    if (filterEmployee !== 'All') {
      query = query.eq('employee_id', filterEmployee);
    }

    const { data, error } = await query;
    if (!error) setShifts(data);
  }

  // Handle form input changes
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Open modal for new or edit
  function openModal(shift = null) {
    if (shift) {
      setForm({
        employee_id: shift.employee_id,
        department: shift.employees.department,
        shift_date: shift.shift_date,
        start_time: shift.start_time,
        end_time: shift.end_time,
      });
      setEditingShift(shift);
    } else {
      setForm({
        employee_id: '',
        department: '',
        shift_date: '',
        start_time: '',
        end_time: '',
      });
      setEditingShift(null);
    }
    setModalOpen(true);
  }

  // Submit form to create/update shift
  async function handleSubmit(e) {
    e.preventDefault();
    const { employee_id, shift_date, start_time, end_time } = form;

    if (!employee_id || !shift_date || !start_time || !end_time) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingShift) {
      // Update
      const { error } = await supabase
        .from('shifts')
        .update({ employee_id, shift_date, start_time, end_time })
        .eq('id', editingShift.id);
      if (error) alert('Error updating shift: ' + error.message);
    } else {
      // Insert
      const { error } = await supabase
        .from('shifts')
        .insert([{ employee_id, shift_date, start_time, end_time }]);
      if (error) alert('Error adding shift: ' + error.message);
    }

    setModalOpen(false);
    fetchShifts();
  }

  // Delete a shift
  async function deleteShift(id) {
    if (!confirm('Are you sure you want to delete this shift?')) return;
    const { error } = await supabase.from('shifts').delete().eq('id', id);
    if (error) alert('Error deleting shift: ' + error.message);
    else fetchShifts();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Staff Scheduling and Shift Rotations</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block font-semibold mb-1">Filter by Department</label>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="All">All</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Filter by Employee</label>
          <select
            value={filterEmployee}
            onChange={(e) => setFilterEmployee(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="All">All</option>
            {employees
              .filter(e => filterDept === 'All' || e.department === filterDept)
              .map((emp) => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
          </select>
        </div>

        <button
          onClick={() => openModal()}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Shift
        </button>
      </div>

      {/* Shifts Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Employee</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Start Time</th>
            <th className="border p-2">End Time</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shifts.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">No shifts found.</td>
            </tr>
          ) : (
            shifts.map((shift) => (
              <tr key={shift.id} className="hover:bg-gray-50">
                <td className="border p-2">{shift.employees?.name}</td>
                <td className="border p-2">{shift.employees?.department}</td>
                <td className="border p-2">{shift.shift_date}</td>
                <td className="border p-2">{shift.start_time}</td>
                <td className="border p-2">{shift.end_time}</td>
                <td className="border p-2 space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => openModal(shift)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deleteShift(shift.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal for Add/Edit Shift */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">{editingShift ? 'Edit Shift' : 'Add Shift'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Employee</label>
            <select
              name="employee_id"
              value={form.employee_id}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>{emp.name} ({emp.department})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Shift Date</label>
            <input
              type="date"
              name="shift_date"
              value={form.shift_date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Start Time</label>
            <input
              type="time"
              name="start_time"
              value={form.start_time}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">End Time</label>
            <input
              type="time"
              name="end_time"
              value={form.end_time}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingShift ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
