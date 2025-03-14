
import React from 'react';
import ChartContainer from '../ui/ChartContainer';
import { cn } from '@/lib/utils';
import { Sparkles, AlertCircle } from 'lucide-react';

const AIAnalysis = () => {
  const evaluations = [
    {
      category: 'Technical Skills',
      score: 92,
      suggestion: 'Strong programming background with good system design knowledge.',
      status: 'high'
    },
    {
      category: 'Experience',
      score: 85,
      suggestion: 'Relevant industry experience, but limited leadership roles.',
      status: 'medium'
    },
    {
      category: 'Education',
      score: 95,
      suggestion: 'Advanced degree in Computer Science with certifications.',
      status: 'high'
    },
    {
      category: 'Cultural Fit',
      score: 78,
      suggestion: 'Values align with company culture, but more collaboration experience needed.',
      status: 'medium'
    },
    {
      category: 'Communication',
      score: 65,
      suggestion: 'Written communication could be improved. Consider writing test.',
      status: 'low'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'high':
        return <span className="status-badge bg-green-100 text-green-800">High Match</span>;
      case 'medium':
        return <span className="status-badge bg-yellow-100 text-yellow-800">Moderate Match</span>;
      case 'low':
        return <span className="status-badge bg-red-100 text-red-800">Low Match</span>;
      default:
        return null;
    }
  };

  return (
    <ChartContainer 
      title="AI Analysis Summary"
      description="Resume evaluation with confidence scores"
      action={
        <div className="flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
          <Sparkles className="w-3 h-3" />
          <span>AI Powered</span>
        </div>
      }
    >
      <div className="space-y-4">
        {evaluations.map((evaluation, index) => (
          <div key={index} className="bg-background rounded-lg p-3 border border-border/50">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm">{evaluation.category}</h4>
              {getStatusBadge(evaluation.status)}
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-3">
              <div 
                className={cn("h-2 rounded-full", getScoreColor(evaluation.score))}
                style={{ width: `${evaluation.score}%` }}
              ></div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5 flex-shrink-0">
                <AlertCircle className="w-3.5 h-3.5 text-purple-500" />
              </div>
              <p className="text-xs text-muted-foreground">{evaluation.suggestion}</p>
            </div>
          </div>
        ))}
      </div>
    </ChartContainer>
  );
};

export default AIAnalysis;
