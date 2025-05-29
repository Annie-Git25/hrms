// src/components/EmployeeForm.jsx
import { useState } from 'react';

function EmployeeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    contact: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-md">
      {/* Input fields for employee data */}
      <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
      <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} className="w-full p-2 border rounded" required />
      <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} className="w-full p-2 border rounded" required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}

export default EmployeeForm;
