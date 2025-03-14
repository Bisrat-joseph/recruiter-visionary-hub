
import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import ResumeUploader from '@/components/resume/ResumeUploader';

const Resume = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div className="flex-1">
        <Navbar collapsed={collapsed} />
        
        <main className={cn(
          "p-6 transition-all duration-300",
          collapsed ? "ml-[70px]" : "ml-[250px]"
        )}>
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-semibold">Resume Analysis</h1>
              <p className="text-muted-foreground mt-1">Upload a resume to analyze skills and qualifications</p>
            </header>
            
            <ResumeUploader />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Resume;
