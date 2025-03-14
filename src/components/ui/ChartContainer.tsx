
import React from 'react';
import { cn } from '@/lib/utils';

interface ChartContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

const ChartContainer = ({ title, description, children, className, action }: ChartContainerProps) => {
  return (
    <div className={cn('chart-container', className)}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium text-base">{title}</h3>
          {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
};

export default ChartContainer;
