
import { Card } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const analyticsData = [
  { name: 'Jan', users: 4000, sessions: 2400, conversions: 2400 },
  { name: 'Feb', users: 3000, sessions: 1398, conversions: 2210 },
  { name: 'Mar', users: 2000, sessions: 9800, conversions: 2290 },
  { name: 'Apr', users: 2780, sessions: 3908, conversions: 2000 },
  { name: 'May', users: 1890, sessions: 4800, conversions: 2181 },
  { name: 'Jun', users: 2390, sessions: 3800, conversions: 2500 },
  { name: 'Jul', users: 3490, sessions: 4300, conversions: 2100 },
];

const bounceRateData = [
  { month: 'Jan', rate: 65 },
  { month: 'Feb', rate: 59 },
  { month: 'Mar', rate: 80 },
  { month: 'Apr', rate: 51 },
  { month: 'May', rate: 45 },
  { month: 'Jun', rate: 38 },
  { month: 'Jul', rate: 40 },
];

const AnalyticsCharts = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">User Engagement</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#8B5CF6" />
            <Line type="monotone" dataKey="sessions" stroke="#F97316" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Bounce Rate</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={bounceRateData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="rate" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;
