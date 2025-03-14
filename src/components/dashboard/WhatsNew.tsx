
import React from 'react';
import ChartContainer from '../ui/ChartContainer';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Brain, BarChart3, Shield } from 'lucide-react';

const WhatsNew = () => {
  const updates = [
    {
      title: 'AI Resume Parser Improvements',
      description: 'We\'ve enhanced our AI resume parser to better identify skills and experience.',
      icon: <Brain className="w-4 h-4" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'New Analytics Dashboard',
      description: 'Gain insights with our new analytics features for hiring performance.',
      icon: <BarChart3 className="w-4 h-4" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'GDPR Compliance Updates',
      description: 'We\'ve updated our systems to ensure compliance with latest regulations.',
      icon: <Shield className="w-4 h-4" />,
      color: 'bg-green-100 text-green-600'
    }
  ];

  return (
    <ChartContainer 
      title="What's New"
      description="Latest product updates and enhancements"
      action={
        <button className="flex items-center text-xs text-primary hover:underline">
          <span>All updates</span>
          <ArrowUpRight className="w-3 h-3 ml-1" />
        </button>
      }
    >
      <div className="space-y-3">
        {updates.map((update, index) => (
          <div 
            key={index}
            className="p-3 border border-border/50 rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all-ease cursor-pointer"
          >
            <div className="flex gap-3">
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', update.color)}>
                {update.icon}
              </div>
              <div>
                <h4 className="font-medium text-sm">{update.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{update.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ChartContainer>
  );
};

export default WhatsNew;
