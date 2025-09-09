import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, TrendingUp, AlertTriangle } from "lucide-react";

export const MetricsGrid = () => {
  const metrics = [
    {
      title: "Total Patients",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      gradient: "bg-gradient-primary",
    },
    {
      title: "High Risk Patients",
      value: "187",
      change: "15%",
      trend: "neutral",
      icon: AlertTriangle,
      gradient: "bg-gradient-risk-high",
    },
    {
      title: "Heart Attack Cases",
      value: "43",
      change: "-8%",
      trend: "down",
      icon: Heart,
      gradient: "bg-gradient-risk-low",
    },
    {
      title: "Recovery Rate",
      value: "89.2%",
      change: "+5.1%",
      trend: "up",
      icon: TrendingUp,
      gradient: "bg-gradient-primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="border-0 shadow-card hover:shadow-medical transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.gradient} shadow-glow`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center mt-1">
                <span
                  className={`text-sm font-medium ${
                    metric.trend === 'up'
                      ? 'text-success'
                      : metric.trend === 'down'
                      ? 'text-destructive'
                      : 'text-warning'
                  }`}
                >
                  {metric.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};