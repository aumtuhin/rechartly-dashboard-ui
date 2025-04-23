
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendValue: string;
  isPositive: boolean;
}

const StatCard = ({ title, value, trend, trendValue, isPositive }: StatCardProps) => (
  <Card className="p-6">
    <p className="text-sm font-medium text-muted-foreground">{title}</p>
    <h3 className="text-2xl font-bold mt-2">{value}</h3>
    <p className={`text-sm mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
      {isPositive ? '↑' : '↓'} {trendValue} ({trend})
    </p>
  </Card>
);

const DashboardHeader = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Revenue"
        value="$45,231"
        trend="vs last month"
        trendValue="12%"
        isPositive={true}
      />
      <StatCard
        title="Active Users"
        value="1,234"
        trend="vs last month"
        trendValue="8%"
        isPositive={true}
      />
      <StatCard
        title="Conversion Rate"
        value="2.4%"
        trend="vs last month"
        trendValue="0.3%"
        isPositive={false}
      />
      <StatCard
        title="Avg. Order Value"
        value="$235"
        trend="vs last month"
        trendValue="4%"
        isPositive={true}
      />
    </div>
  );
};

export default DashboardHeader;
