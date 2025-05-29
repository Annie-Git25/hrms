// src/pages/EmployeePage.jsx
import { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';
import Modal from '../components/Modal';

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = (employee) => {
    setEmployees([...employees, employee]);
    setIsModalOpen(false);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (employee) => {
    setEmployees(employees.filter((e) => e !== employee));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
      <button className="mb-4 bg-green-500 text-white px-4 py-2 rounded" onClick={() => { setEditingEmployee(null); setIsModalOpen(true); }}>+ Add Employee</button>
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal title={editingEmployee ? "Edit Employee" : "Add Employee"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EmployeeForm
          onSubmit={(formData) => {
            editingEmployee
              ? setEmployees(
                  employees.map((emp) => (emp === editingEmployee ? formData : emp))
                )
              : handleAdd(formData);
            setIsModalOpen(false);
          }}
          defaultData={editingEmployee}
        />
      </Modal>
    </div>
  );
}

export default EmployeePage;
