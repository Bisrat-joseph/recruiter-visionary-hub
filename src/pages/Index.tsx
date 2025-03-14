
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import MetricsPanel from '@/components/dashboard/MetricsPanel';
import CandidateInsights from '@/components/dashboard/CandidateInsights';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import AIAnalysis from '@/components/dashboard/AIAnalysis';
import HiringFunnel from '@/components/dashboard/HiringFunnel';
import WhatsNew from '@/components/dashboard/WhatsNew';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userProfile } = useAuth();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const userName = userProfile?.first_name || 'User';

  const renderLoadingSkeleton = () => (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="h-24 bg-muted rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="h-64 bg-muted rounded-xl" />
        <div className="h-64 bg-muted rounded-xl" />
        <div className="h-64 bg-muted rounded-xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-96 bg-muted rounded-xl" />
        <div className="h-96 bg-muted rounded-xl" />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div className="flex-1">
        <Navbar collapsed={collapsed} />
        
        <main className={cn(
          "p-6 transition-all duration-300",
          collapsed ? "ml-[70px]" : "ml-[250px]"
        )}>
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <div className="animate-fade-up" style={{ '--delay': '0' } as React.CSSProperties}>
                <h1 className="text-2xl font-semibold">Welcome back, {userName}</h1>
                <p className="text-muted-foreground mt-1">Here's what's happening with your recruitment today.</p>
              </div>
            </header>
            
            {loading ? (
              renderLoadingSkeleton()
            ) : (
              <div className="space-y-6">
                <div className="animate-fade-up" style={{ '--delay': '1' } as React.CSSProperties}>
                  <MetricsPanel />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="animate-fade-up" style={{ '--delay': '2' } as React.CSSProperties}>
                    <CandidateInsights />
                  </div>
                  <div className="animate-fade-up" style={{ '--delay': '3' } as React.CSSProperties}>
                    <AIAnalysis />
                  </div>
                  <div className="animate-fade-up" style={{ '--delay': '4' } as React.CSSProperties}>
                    <WhatsNew />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-fade-up" style={{ '--delay': '5' } as React.CSSProperties}>
                    <ActivityFeed />
                  </div>
                  <div className="animate-fade-up" style={{ '--delay': '6' } as React.CSSProperties}>
                    <HiringFunnel />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
