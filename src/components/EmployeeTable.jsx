// src/components/EmployeeTable.jsx
function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Department</th>
          <th className="border p-2">Contact</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp, idx) => (
          <tr key={idx} className="text-center">
            <td className="border p-2">{emp.name}</td>
            <td className="border p-2">{emp.email}</td>
            <td className="border p-2">{emp.department}</td>
            <td className="border p-2">{emp.contact}</td>
            <td className="border p-2">
              <button onClick={() => onEdit(emp)} className="text-blue-600 mr-2">Edit</button>
              <button onClick={() => onDelete(emp)} className="text-red-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
