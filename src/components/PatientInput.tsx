import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { User, Heart, Activity, Droplets, Zap } from "lucide-react";
import { PatientResults } from "./PatientResults";

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

interface PatientInputProps {
  onBack: () => void;
}

export const PatientInput = ({ onBack }: PatientInputProps) => {
  const [formData, setFormData] = useState<PatientData>({
    age: "",
    gender: "",
    heartRate: "",
    systolicBP: "",
    diastolicBP: "",
    bloodSugar: "",
    ckMB: "",
    troponin: "",
  });

  const [showResults, setShowResults] = useState(false);
  const [riskScore, setRiskScore] = useState(0);

  const handleInputChange = (field: keyof PatientData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateRisk = () => {
    // Simple risk calculation algorithm based on patient data
    let risk = 0;
    
    // Age factor (higher age = higher risk)
    const age = parseInt(formData.age);
    if (age > 60) risk += 25;
    else if (age > 50) risk += 15;
    else if (age > 40) risk += 10;
    else if (age > 30) risk += 5;

    // Gender factor (males typically higher risk)
    if (formData.gender === "male") risk += 10;

    // Heart rate factor
    const heartRate = parseInt(formData.heartRate);
    if (heartRate > 100 || heartRate < 60) risk += 15;

    // Blood pressure factor
    const systolic = parseInt(formData.systolicBP);
    const diastolic = parseInt(formData.diastolicBP);
    if (systolic > 140 || diastolic > 90) risk += 20;
    else if (systolic > 130 || diastolic > 80) risk += 10;

    // Blood sugar factor
    const bloodSugar = parseInt(formData.bloodSugar);
    if (bloodSugar > 126) risk += 15;
    else if (bloodSugar > 100) risk += 8;

    // CK-MB factor (elevated levels indicate heart damage)
    const ckMB = parseFloat(formData.ckMB);
    if (ckMB > 25) risk += 20;
    else if (ckMB > 15) risk += 10;

    // Troponin factor (most critical marker)
    const troponin = parseFloat(formData.troponin);
    if (troponin > 0.4) risk += 30;
    else if (troponin > 0.1) risk += 15;
    else if (troponin > 0.04) risk += 8;

    return Math.min(risk, 100); // Cap at 100%
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    const requiredFields = Object.values(formData);
    if (requiredFields.some(field => !field.trim())) {
      toast.error("Please fill in all fields");
      return;
    }

    // Calculate risk score
    const calculatedRisk = calculateRisk();
    setRiskScore(calculatedRisk);
    setShowResults(true);
    
    toast.success("Risk assessment completed!");
  };

  const resetForm = () => {
    setFormData({
      age: "",
      gender: "",
      heartRate: "",
      systolicBP: "",
      diastolicBP: "",
      bloodSugar: "",
      ckMB: "",
      troponin: "",
    });
    setShowResults(false);
    setRiskScore(0);
  };

  if (showResults) {
    return (
      <PatientResults 
        riskScore={riskScore} 
        patientData={formData}
        onBack={() => setShowResults(false)}
        onNewAssessment={resetForm}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Patient Risk Assessment</h2>
        <p className="text-lg text-muted-foreground">
          Enter patient health metrics for immediate heart attack risk prediction
        </p>
      </div>

      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  min="1"
                  max="120"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Cardiovascular Metrics */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-destructive" />
                <h3 className="text-lg font-semibold">Cardiovascular Metrics</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    placeholder="60-100"
                    value={formData.heartRate}
                    onChange={(e) => handleInputChange("heartRate", e.target.value)}
                    min="30"
                    max="250"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systolicBP">Systolic BP (mmHg)</Label>
                  <Input
                    id="systolicBP"
                    type="number"
                    placeholder="90-180"
                    value={formData.systolicBP}
                    onChange={(e) => handleInputChange("systolicBP", e.target.value)}
                    min="70"
                    max="250"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diastolicBP">Diastolic BP (mmHg)</Label>
                  <Input
                    id="diastolicBP"
                    type="number"
                    placeholder="60-120"
                    value={formData.diastolicBP}
                    onChange={(e) => handleInputChange("diastolicBP", e.target.value)}
                    min="40"
                    max="150"
                  />
                </div>
              </div>
            </div>

            {/* Laboratory Values */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-semibold">Laboratory Values</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
                  <Input
                    id="bloodSugar"
                    type="number"
                    placeholder="70-200"
                    value={formData.bloodSugar}
                    onChange={(e) => handleInputChange("bloodSugar", e.target.value)}
                    min="30"
                    max="500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ckMB">CK-MB Levels (ng/mL)</Label>
                  <Input
                    id="ckMB"
                    type="number"
                    step="0.1"
                    placeholder="0-50"
                    value={formData.ckMB}
                    onChange={(e) => handleInputChange("ckMB", e.target.value)}
                    min="0"
                    max="200"
                  />
                </div>
              </div>
            </div>

            {/* Critical Markers */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="h-5 w-5 text-warning" />
                <h3 className="text-lg font-semibold">Critical Cardiac Markers</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="troponin">Troponin Levels (ng/mL)</Label>
                <Input
                  id="troponin"
                  type="number"
                  step="0.01"
                  placeholder="0.00-2.00"
                  value={formData.troponin}
                  onChange={(e) => handleInputChange("troponin", e.target.value)}
                  min="0"
                  max="50"
                />
                <p className="text-xs text-muted-foreground">
                  Normal: &lt;0.04 ng/mL | Elevated: &gt;0.4 ng/mL
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                className="flex-1"
              >
                Back to Dashboard
              </Button>
              <Button 
                type="submit" 
                variant="medical" 
                className="flex-1 gap-2"
              >
                <Zap className="h-4 w-4" />
                Calculate Risk
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};