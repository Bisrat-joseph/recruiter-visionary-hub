
import React from 'react';
import ChartContainer from '../ui/ChartContainer';
import { cn } from '@/lib/utils';

const HiringFunnel = () => {
  const stages = [
    { name: 'Applications', count: 350, percent: 100, color: 'bg-purple-500' },
    { name: 'Resume Screening', count: 210, percent: 60, color: 'bg-purple-500/90' },
    { name: 'Phone Interview', count: 150, percent: 43, color: 'bg-purple-500/80' },
    { name: 'Technical Assessment', count: 78, percent: 22, color: 'bg-purple-500/70' },
    { name: 'On-Site Interview', count: 42, percent: 12, color: 'bg-purple-500/60' },
    { name: 'Offer Extended', count: 18, percent: 5, color: 'bg-purple-500/50' },
    { name: 'Hired', count: 12, percent: 3.4, color: 'bg-purple-500/40' },
  ];

  return (
    <ChartContainer 
      title="Hiring Funnel"
      description="Candidate progress through recruitment stages"
    >
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">{stage.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{stage.count}</span>
                <span className="text-xs text-muted-foreground">({stage.percent}%)</span>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={cn("h-2 rounded-full transition-all duration-1000", stage.color)}
                style={{ width: `${stage.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </ChartContainer>
  );
};

export default HiringFunnel;
