// src/pages/TrainingManagement.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

function TrainingManagement() {
  const [trainings, setTrainings] = useState([]);
  const [employeeTrainings, setEmployeeTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [completionDate, setCompletionDate] = useState('');

  // Fetch all training programs
  const fetchTrainings = async () => {
    const { data, error } = await supabase.from('trainings').select('*');
    if (!error) setTrainings(data);
  };

  // Fetch employee's training progress (for logged-in user)
  const fetchEmployeeTrainings = async () => {
    const user = supabase.auth.user();
    if (!user) return;
    const { data, error } = await supabase
      .from('employee_trainings')
      .select('*, trainings(*)')
      .eq('employee_id', user.id);

    if (!error) setEmployeeTrainings(data);
  };

  useEffect(() => {
    fetchTrainings();
    fetchEmployeeTrainings();
  }, []);

  // Add completion record for selected training
  const addCompletion = async () => {
    const user = supabase.auth.user();
    if (!user || !selectedTraining || !completionDate) return alert('Please fill all fields.');

    const { error } = await supabase.from('employee_trainings').insert([
      {
        employee_id: user.id,
        training_id: selectedTraining,
        completion_date: completionDate,
        certification_received: false,
      }
    ]);

    if (!error) {
      alert('Training completion recorded!');
      fetchEmployeeTrainings();
      setSelectedTraining(null);
      setCompletionDate('');
    } else {
      alert('Error saving completion: ' + error.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Training Management</h2>

      {/* Training Programs List */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Available Training Programs</h3>
        <ul className="list-disc list-inside space-y-2">
          {trainings.map((t) => (
            <li key={t.id}>
              <strong>{t.title}</strong> {t.mandatory && <span className="text-red-600">(Mandatory)</span>}
              <p>{t.description}</p>
              {t.certification && <p><em>Certification:</em> {t.certification}</p>}
            </li>
          ))}
        </ul>
      </section>

      {/* Record Training Completion */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Record Training Completion</h3>
        <select
          className="border p-2 rounded mr-3"
          value={selectedTraining || ''}
          onChange={(e) => setSelectedTraining(e.target.value)}
        >
          <option value="" disabled>Select training</option>
          {trainings.map((t) => (
            <option key={t.id} value={t.id}>{t.title}</option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 rounded mr-3"
          value={completionDate}
          onChange={(e) => setCompletionDate(e.target.value)}
        />

        <button
          onClick={addCompletion}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Completion
        </button>
      </section>

      {/* Employee Training Records */}
      <section>
        <h3 className="text-xl font-semibold mb-3">Your Training Records</h3>
        {employeeTrainings.length === 0 ? (
          <p>No training records found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Training</th>
                <th className="border p-2 text-left">Completion Date</th>
                <th className="border p-2 text-left">Certification Received</th>
                <th className="border p-2 text-left">Certification Expiry</th>
              </tr>
            </thead>
            <tbody>
              {employeeTrainings.map((et) => (
                <tr key={et.id} className="hover:bg-gray-50">
                  <td className="border p-2">{et.trainings.title}</td>
                  <td className="border p-2">{et.completion_date}</td>
                  <td className="border p-2">{et.certification_received ? 'Yes' : 'No'}</td>
                  <td className="border p-2">{et.certification_expiry || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default TrainingManagement;
