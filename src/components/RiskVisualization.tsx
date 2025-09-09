import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend } from "recharts";

const ageRiskData = [
  { age: "20-30", risk: 5, patients: 156 },
  { age: "31-40", risk: 12, patients: 234 },
  { age: "41-50", risk: 23, patients: 298 },
  { age: "51-60", risk: 34, patients: 345 },
  { age: "61-70", risk: 48, patients: 198 },
  { age: "70+", risk: 62, patients: 87 },
];

const genderRiskData = [
  { name: "Male", value: 58, color: "#0ea5e9" },
  { name: "Female", value: 42, color: "#06b6d4" },
];

const biomarkerData = [
  { month: "Jan", ckMB: 145, troponin: 0.8, heartRate: 78 },
  { month: "Feb", ckMB: 158, troponin: 1.2, heartRate: 82 },
  { month: "Mar", ckMB: 162, troponin: 1.4, heartRate: 85 },
  { month: "Apr", ckMB: 171, troponin: 1.8, heartRate: 88 },
  { month: "May", ckMB: 185, troponin: 2.1, heartRate: 91 },
  { month: "Jun", ckMB: 192, troponin: 2.3, heartRate: 89 },
];

export const RiskVisualization = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Age vs Risk Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Heart Attack Risk by Age Group</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageRiskData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="age" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="risk" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gender Distribution */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Risk Distribution by Gender</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderRiskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {genderRiskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Biomarker Trends */}
      <Card className="shadow-card lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Biomarker Trends Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={biomarkerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="ckMB" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                name="CK-MB Levels"
              />
              <Line 
                type="monotone" 
                dataKey="troponin" 
                stroke="hsl(var(--accent))" 
                strokeWidth={3}
                name="Troponin Levels"
              />
              <Line 
                type="monotone" 
                dataKey="heartRate" 
                stroke="hsl(var(--warning))" 
                strokeWidth={3}
                name="Heart Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};