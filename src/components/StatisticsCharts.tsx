
import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { name: 'Week 1', pageLoad: 2.4, serverResponse: 1.8, errorRate: 0.5 },
  { name: 'Week 2', pageLoad: 2.1, serverResponse: 1.5, errorRate: 0.3 },
  { name: 'Week 3', pageLoad: 2.8, serverResponse: 2.0, errorRate: 0.7 },
  { name: 'Week 4', pageLoad: 1.9, serverResponse: 1.4, errorRate: 0.2 },
  { name: 'Week 5', pageLoad: 2.3, serverResponse: 1.7, errorRate: 0.4 },
];

const conversionData = [
  { date: 'Mon', visits: 4000, signups: 2400, purchases: 1200 },
  { date: 'Tue', visits: 3000, signups: 1398, purchases: 900 },
  { date: 'Wed', visits: 2000, signups: 1800, purchases: 1000 },
  { date: 'Thu', visits: 2780, signups: 2908, purchases: 1400 },
  { date: 'Fri', visits: 1890, signups: 1800, purchases: 980 },
  { date: 'Sat', visits: 2390, signups: 2800, purchases: 1300 },
  { date: 'Sun', visits: 3490, signups: 3300, purchases: 1700 },
];

const StatisticsCharts = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pageLoad" fill="#8B5CF6" />
            <Bar dataKey="serverResponse" fill="#F97316" />
            <Line type="monotone" dataKey="errorRate" stroke="#0EA5E9" />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Conversion Funnel</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={conversionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="visits" fill="#8B5CF6" />
            <Bar dataKey="signups" fill="#F97316" />
            <Bar dataKey="purchases" fill="#0EA5E9" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default StatisticsCharts;
