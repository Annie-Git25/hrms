// src/pages/Dashboard.jsx
import Card from '../components/ui/Card';

function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
          <h2 className="text-xl font-bold">Employees on Leave</h2>
          <p>5 employees currently on leave.</p>
      </Card>
      <Card>
          <h2 className="text-xl font-bold">Turnover Rate</h2>
          <p>12% this quarter</p>
      </Card>
      <Card>
          <h2 className="text-xl font-bold">Top Performer</h2>
          <p>Jane Doe</p>
      </Card>
    </div>
  );
}

export default Dashboard;
