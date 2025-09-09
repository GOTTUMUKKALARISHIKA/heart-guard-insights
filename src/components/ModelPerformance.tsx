import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, AreaChart, Area } from "recharts";
import { TrendingUp, Target, Zap, Shield } from "lucide-react";

const rocData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.1, tpr: 0.3 },
  { fpr: 0.2, tpr: 0.6 },
  { fpr: 0.3, tpr: 0.75 },
  { fpr: 0.4, tpr: 0.85 },
  { fpr: 0.5, tpr: 0.91 },
  { fpr: 0.6, tpr: 0.95 },
  { fpr: 0.7, tpr: 0.97 },
  { fpr: 0.8, tpr: 0.98 },
  { fpr: 0.9, tpr: 0.99 },
  { fpr: 1, tpr: 1 },
];

const performanceMetrics = [
  {
    metric: "Accuracy",
    value: 94.2,
    icon: Target,
    color: "text-success",
    description: "Overall prediction accuracy"
  },
  {
    metric: "Precision",
    value: 91.8,
    icon: Zap,
    color: "text-primary",
    description: "Positive prediction accuracy"
  },
  {
    metric: "Recall",
    value: 89.4,
    icon: TrendingUp,
    color: "text-accent",
    description: "True positive detection rate"
  },
  {
    metric: "F1-Score",
    value: 90.6,
    icon: Shield,
    color: "text-warning",
    description: "Harmonic mean of precision and recall"
  },
];

export const ModelPerformance = () => {
  return (
    <div className="space-y-6">
      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="shadow-card hover:shadow-medical transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.metric}
                </CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-2">{metric.value}%</div>
                <Progress value={metric.value} className="mb-2" />
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROC Curve */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              ROC Curve
              <Badge variant="secondary" className="text-xs">AUC: 0.96</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={rocData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="fpr" 
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="tpr"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={3}
                />
                <Line 
                  data={[{fpr: 0, tpr: 0}, {fpr: 1, tpr: 1}]}
                  stroke="hsl(var(--muted-foreground))" 
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Feature Importance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Feature Importance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { feature: "Troponin Levels", importance: 85 },
                { feature: "CK-MB Levels", importance: 78 },
                { feature: "Age", importance: 72 },
                { feature: "Systolic BP", importance: 64 },
                { feature: "Heart Rate", importance: 58 },
                { feature: "Blood Sugar", importance: 45 },
                { feature: "Gender", importance: 32 },
                { feature: "Diastolic BP", importance: 28 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{item.feature}</span>
                    <span className="text-sm text-muted-foreground">{item.importance}%</span>
                  </div>
                  <Progress value={item.importance} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Risk Assessment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-gradient-risk-low">
              <div className="text-2xl font-bold text-success-foreground mb-2">68%</div>
              <div className="text-sm text-success-foreground/80">Low Risk Patients</div>
              <div className="text-xs text-success-foreground/60 mt-1">≤ 30% risk score</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-warning/80 to-warning">
              <div className="text-2xl font-bold text-warning-foreground mb-2">22%</div>
              <div className="text-sm text-warning-foreground/90">Moderate Risk</div>
              <div className="text-xs text-warning-foreground/70 mt-1">31-60% risk score</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-risk-high">
              <div className="text-2xl font-bold text-destructive-foreground mb-2">10%</div>
              <div className="text-sm text-destructive-foreground/90">High Risk Patients</div>
              <div className="text-xs text-destructive-foreground/70 mt-1">≥ 61% risk score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};