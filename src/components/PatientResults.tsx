import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Heart, CheckCircle, TrendingDown, ArrowLeft, RotateCcw, FileText } from "lucide-react";

interface PatientData {
  age: string;
  gender: string;
  heartRate: string;
  systolicBP: string;
  diastolicBP: string;
  bloodSugar: string;
  ckMB: string;
  troponin: string;
}

interface PatientResultsProps {
  riskScore: number;
  patientData: PatientData;
  onBack: () => void;
  onNewAssessment: () => void;
}

export const PatientResults = ({ riskScore, patientData, onBack, onNewAssessment }: PatientResultsProps) => {
  const getRiskLevel = () => {
    if (riskScore <= 30) return { level: "Low", color: "success", icon: CheckCircle, gradient: "bg-gradient-risk-low" };
    if (riskScore <= 60) return { level: "Moderate", color: "warning", icon: TrendingDown, gradient: "bg-gradient-to-r from-warning/80 to-warning" };
    return { level: "High", color: "destructive", icon: AlertTriangle, gradient: "bg-gradient-risk-high" };
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (riskScore > 60) {
      recommendations.push("Immediate medical consultation required");
      recommendations.push("Consider emergency cardiac evaluation");
      recommendations.push("Monitor vital signs closely");
    } else if (riskScore > 30) {
      recommendations.push("Schedule follow-up with cardiologist");
      recommendations.push("Regular monitoring of cardiac biomarkers");
      recommendations.push("Lifestyle modifications recommended");
    } else {
      recommendations.push("Continue regular health checkups");
      recommendations.push("Maintain healthy lifestyle");
      recommendations.push("Monitor blood pressure regularly");
    }

    // Specific recommendations based on individual metrics
    const age = parseInt(patientData.age);
    const heartRate = parseInt(patientData.heartRate);
    const systolic = parseInt(patientData.systolicBP);
    const bloodSugar = parseInt(patientData.bloodSugar);
    const troponin = parseFloat(patientData.troponin);

    if (age > 65) recommendations.push("Age-related cardiovascular screening");
    if (heartRate > 100) recommendations.push("Heart rate management consultation");
    if (systolic > 140) recommendations.push("Blood pressure management");
    if (bloodSugar > 126) recommendations.push("Diabetes screening and management");
    if (troponin > 0.4) recommendations.push("Urgent cardiac enzyme evaluation");

    return recommendations.slice(0, 6); // Limit to 6 recommendations
  };

  const riskLevel = getRiskLevel();
  const Icon = riskLevel.icon;
  const recommendations = getRecommendations();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Risk Assessment Results</h2>
        <p className="text-lg text-muted-foreground">
          Comprehensive heart attack risk analysis for patient
        </p>
      </div>

      {/* Risk Score Card */}
      <Card className="shadow-medical border-2">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Heart Attack Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`rounded-xl p-8 text-center ${riskLevel.gradient} shadow-glow`}>
            <Icon className="h-16 w-16 mx-auto mb-4 text-white" />
            <div className="text-4xl font-bold text-white mb-2">{riskScore}%</div>
            <Badge 
              variant="secondary" 
              className="text-lg px-4 py-2 bg-white/20 text-white border-white/30"
            >
              {riskLevel.level} Risk
            </Badge>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Risk Level</span>
              <span className="text-sm text-muted-foreground">{riskScore}%</span>
            </div>
            <Progress value={riskScore} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Low (0-30%)</span>
              <span>Moderate (31-60%)</span>
              <span>High (61-100%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Summary */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Patient Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span className="font-medium">{patientData.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gender:</span>
                <span className="font-medium capitalize">{patientData.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Heart Rate:</span>
                <span className="font-medium">{patientData.heartRate} bpm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Blood Pressure:</span>
                <span className="font-medium">{patientData.systolicBP}/{patientData.diastolicBP} mmHg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Blood Sugar:</span>
                <span className="font-medium">{patientData.bloodSugar} mg/dL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CK-MB:</span>
                <span className="font-medium">{patientData.ckMB} ng/mL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Troponin:</span>
                <span className="font-medium">{patientData.troponin} ng/mL</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              Clinical Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/60">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm">{recommendation}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Factors Breakdown */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Risk Factor Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { factor: "Age", value: parseInt(patientData.age), risk: parseInt(patientData.age) > 60 ? "High" : parseInt(patientData.age) > 40 ? "Moderate" : "Low" },
              { factor: "Blood Pressure", value: `${patientData.systolicBP}/${patientData.diastolicBP}`, risk: parseInt(patientData.systolicBP) > 140 ? "High" : parseInt(patientData.systolicBP) > 130 ? "Moderate" : "Low" },
              { factor: "Heart Rate", value: parseInt(patientData.heartRate), risk: parseInt(patientData.heartRate) > 100 || parseInt(patientData.heartRate) < 60 ? "High" : "Low" },
              { factor: "Troponin", value: parseFloat(patientData.troponin), risk: parseFloat(patientData.troponin) > 0.4 ? "High" : parseFloat(patientData.troponin) > 0.1 ? "Moderate" : "Low" },
            ].map((item, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-background/60">
                <div className="text-lg font-semibold">{item.factor}</div>
                <div className="text-2xl font-bold text-primary my-2">{item.value}</div>
                <Badge 
                  variant={item.risk === "High" ? "destructive" : item.risk === "Moderate" ? "secondary" : "default"}
                  className="text-xs"
                >
                  {item.risk} Risk
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Input
        </Button>
        <Button variant="medical" onClick={onNewAssessment} className="flex-1 gap-2">
          <RotateCcw className="h-4 w-4" />
          New Assessment
        </Button>
      </div>
    </div>
  );
};