// src/pages/Dashboard.jsx
import { Card, CardContent } from '@/components/ui/card';

function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Sample dashboard cards */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold">Employees on Leave</h2>
          <p>5 employees currently on leave.</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold">Turnover Rate</h2>
          <p>12% this quarter</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold">Top Performer</h2>
          <p>Jane Doe</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
