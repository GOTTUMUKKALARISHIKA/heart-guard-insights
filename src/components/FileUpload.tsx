import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  onUpload: () => void;
}

export const FileUpload = ({ onUpload }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0];
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.xlsx',
      '.xls'
    ];
    
    const isValidType = validTypes.some(type => 
      file.type === type || file.name.toLowerCase().endsWith(type)
    );
    
    if (!isValidType) {
      toast.error("Please upload an Excel file (.xlsx or .xls)");
      return;
    }

    // Simulate file processing
    toast.loading("Processing patient data...");
    
    setTimeout(() => {
      setIsUploaded(true);
      toast.success("Patient data uploaded successfully!");
      onUpload();
    }, 2000);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-secondary/30 to-background shadow-medical">
      <CardHeader>
        <CardTitle className="text-center text-xl">Upload Patient Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
            ${isDragging 
              ? 'border-primary bg-primary/5 shadow-glow' 
              : 'border-border hover:border-primary/50'
            }
            ${isUploaded ? 'border-success bg-success/5' : ''}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {!isUploaded ? (
            <>
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-glow">
                <Upload className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Drop your Excel file here</h3>
              <p className="text-muted-foreground mb-6">
                Or click to browse for files containing patient health data
              </p>
              <Button onClick={openFileDialog} className="gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Select Excel File
              </Button>
            </>
          ) : (
            <>
              <div className="mx-auto w-16 h-16 bg-gradient-risk-low rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-success-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-success mb-2">File uploaded successfully!</h3>
              <p className="text-muted-foreground">
                Patient data is ready for analysis
              </p>
            </>
          )}
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div className="bg-background/60 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Required Columns:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Age</li>
              <li>• Gender</li>
              <li>• Heart Rate</li>
              <li>• Blood Pressure (Systolic/Diastolic)</li>
            </ul>
          </div>
          <div className="bg-background/60 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Additional Metrics:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Blood Sugar</li>
              <li>• CK-MB Levels</li>
              <li>• Troponin Levels</li>
              <li>• Result (Outcome)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};