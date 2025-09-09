import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Heart, Activity, TrendingUp, Users, UserCheck } from "lucide-react";
import { FileUpload } from "./FileUpload";
import { MetricsGrid } from "./MetricsGrid";
import { RiskVisualization } from "./RiskVisualization";
import { ModelPerformance } from "./ModelPerformance";
import { PatientInput } from "./PatientInput";

export const Dashboard = () => {
  const [hasData, setHasData] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<'upload' | 'analysis' | 'prediction' | 'patient'>('upload');

  const handleDataUpload = () => {
    setHasData(true);
    setAnalysisStep('analysis');
  };

  return (
    <div className="min-h-screen bg-gradient-medical">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary shadow-glow">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">CardioAnalytics</h1>
                <p className="text-sm text-muted-foreground">Heart Attack Risk Prediction & Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant={analysisStep === 'patient' ? 'medical' : 'outline'}
                onClick={() => setAnalysisStep('patient')}
                className="gap-2"
              >
                <UserCheck className="h-4 w-4" />
                Patient Risk
              </Button>
              <div className="h-6 w-px bg-border" />
              <Button 
                variant={analysisStep === 'upload' ? 'default' : 'secondary'}
                onClick={() => setAnalysisStep('upload')}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                Data Upload
              </Button>
              <Button 
                variant={analysisStep === 'analysis' ? 'default' : 'secondary'}
                onClick={() => setAnalysisStep('analysis')}
                disabled={!hasData}
                className="gap-2"
              >
                <Activity className="h-4 w-4" />
                Analysis
              </Button>
              <Button 
                variant={analysisStep === 'prediction' ? 'default' : 'secondary'}
                onClick={() => setAnalysisStep('prediction')}
                disabled={!hasData}
                className="gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Prediction
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {analysisStep === 'upload' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Upload Patient Data</h2>
              <p className="text-lg text-muted-foreground">
                Upload your Excel file containing patient health data for heart attack risk analysis
              </p>
            </div>
            <FileUpload onUpload={handleDataUpload} />
          </div>
        )}

        {analysisStep === 'analysis' && hasData && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Data Analysis Dashboard</h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive analysis of patient data and risk factors
              </p>
            </div>
            
            <MetricsGrid />
            <RiskVisualization />
          </div>
        )}

        {analysisStep === 'prediction' && hasData && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Model Performance & Predictions</h2>
              <p className="text-lg text-muted-foreground">
                Machine learning model results and predictive analytics
              </p>
            </div>
            
            <ModelPerformance />
          </div>
        )}

        {analysisStep === 'patient' && (
          <PatientInput onBack={() => setAnalysisStep('upload')} />
        )}
        
        {/* Welcome State */}
        {!hasData && analysisStep === 'upload' && (
          <div className="max-w-2xl mx-auto mt-16">
            <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-secondary/50 to-background shadow-medical">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-glow">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Welcome to CardioAnalytics</CardTitle>
                <CardDescription className="text-base">
                  Advanced heart attack risk prediction using machine learning
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  <div className="flex flex-col items-center p-4 rounded-lg bg-background/60">
                    <UserCheck className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold">Patient Risk</h3>
                    <p className="text-sm text-muted-foreground">Individual risk assessment</p>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-background/60">
                    <Upload className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold">Upload Data</h3>
                    <p className="text-sm text-muted-foreground">Excel files with patient metrics</p>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-background/60">
                    <Activity className="h-8 w-8 text-accent mb-2" />
                    <h3 className="font-semibold">Analyze Risk</h3>
                    <p className="text-sm text-muted-foreground">Interactive visualizations</p>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-background/60">
                    <TrendingUp className="h-8 w-8 text-success mb-2" />
                    <h3 className="font-semibold">Predict Outcomes</h3>
                    <p className="text-sm text-muted-foreground">ML-powered predictions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};