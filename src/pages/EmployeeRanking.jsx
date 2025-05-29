// src/pages/EmployeeRanking.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

function EmployeeRanking() {
  const [rankings, setRankings] = useState([]);
  const [monthFilter, setMonthFilter] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch rankings for selected month (default current month)
  const fetchRankings = async (month) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('employee_rankings')
      .select(`
        id,
        rank,
        score,
        recognized,
        employees (
          id,
          name,
          department
        )
      `)
      .eq('ranking_month', month)
      .order('rank', { ascending: true });

    if (!error) setRankings(data);
    setLoading(false);
  };

  // On mount, fetch rankings for current month
  useEffect(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const month = `${yyyy}-${mm}-01`;
    setMonthFilter(month);
    fetchRankings(month);
  }, []);

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setMonthFilter(selectedMonth);
    fetchRankings(selectedMonth);
  };

  // UI for recognizing employee (toggle recognized state)
  const toggleRecognition = async (rankingId, currentState) => {
    const { error } = await supabase
      .from('employee_rankings')
      .update({ recognized: !currentState })
      .eq('id', rankingId);

    if (!error) {
      setRankings((prev) =>
        prev.map((r) =>
          r.id === rankingId ? { ...r, recognized: !currentState } : r
        )
      );
    } else {
      alert('Failed to update recognition status.');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Employee Ranking & Recognition</h2>

      {/* Month Filter */}
      <div className="mb-4">
        <label htmlFor="month" className="mr-2 font-semibold">
          Select Month:
        </label>
        <input
          type="month"
          id="month"
          value={monthFilter.slice(0, 7)} // YYYY-MM format for input month type
          onChange={(e) => handleMonthChange(`${e.target.value}-01`)}
          className="border rounded p-2"
        />
      </div>

      {loading ? (
        <p>Loading rankings...</p>
      ) : rankings.length === 0 ? (
        <p>No rankings found for this month.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Rank</th>
              <th className="border p-3 text-left">Employee</th>
              <th className="border p-3 text-left">Department</th>
              <th className="border p-3 text-left">Score</th>
              <th className="border p-3 text-center">Recognized</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map(({ id, rank, score, recognized, employees }) => (
              <tr
                key={id}
                className={`hover:bg-gray-50 ${
                  recognized ? 'bg-green-50' : ''
                }`}
              >
                <td className="border p-3">{rank}</td>
                <td className="border p-3">{employees.name}</td>
                <td className="border p-3">{employees.department}</td>
                <td className="border p-3">{score.toFixed(2)}</td>
                <td className="border p-3 text-center">
                  {recognized ? '🏆' : '—'}
                </td>
                <td className="border p-3 text-center">
                  <button
                    onClick={() => toggleRecognition(id, recognized)}
                    className={`px-3 py-1 rounded ${
                      recognized ? 'bg-red-400 text-white' : 'bg-green-400 text-white'
                    } hover:opacity-80`}
                    title={recognized ? 'Revoke Recognition' : 'Recognize Employee'}
                  >
                    {recognized ? 'Revoke' : 'Recognize'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeRanking;
