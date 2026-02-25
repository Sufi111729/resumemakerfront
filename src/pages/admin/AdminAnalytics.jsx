import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", views: 120 },
  { name: "Tue", views: 200 },
  { name: "Wed", views: 160 },
  { name: "Thu", views: 240 },
  { name: "Fri", views: 300 }
];

export default function AdminAnalytics() {
  return (
    <div>
      <h1 className="text-2xl font-display font-semibold">Analytics</h1>
      <div className="mt-6 card p-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#0f766e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
