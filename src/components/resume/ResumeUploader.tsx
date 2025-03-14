
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Separator } from '@/components/ui/separator';

export default function ResumeUploader() {
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { toast } = useToast();

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      toast({
        title: "No text to analyze",
        description: "Please paste a resume or upload a file",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-resume', {
        body: { resumeText }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      
      toast({
        title: "Analysis complete",
        description: "Your resume has been successfully analyzed",
      });
    } catch (error: any) {
      console.error("Error analyzing resume:", error);
      toast({
        title: "Analysis failed",
        description: error.message || "Failed to analyze resume",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Only accept text or PDF files
    if (file.type !== 'text/plain' && file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a text or PDF file",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setResumeText(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Resume Analysis</h2>
        <div className="space-y-4">
          <Textarea
            placeholder="Paste resume text here..."
            className="min-h-[200px]"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('resume-file')?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Resume
            </Button>
            <input
              id="resume-file"
              type="file"
              accept=".txt,.pdf"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button 
              onClick={analyzeResume} 
              disabled={isAnalyzing}
              className="ml-auto"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Analyze Resume
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {analysis && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
          <div className="prose max-w-none whitespace-pre-line">
            {analysis}
          </div>
        </Card>
      )}
    </div>
  );
}
