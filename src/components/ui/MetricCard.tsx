
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    positive?: boolean;
  };
  icon?: LucideIcon;
  color?: 'default' | 'purple' | 'blue' | 'green' | 'orange' | 'red';
  className?: string;
}

const MetricCard = ({ title, value, change, icon: Icon, color = 'default', className }: MetricCardProps) => {
  const getIconContainerClass = () => {
    switch (color) {
      case 'purple':
        return 'bg-purple-100 text-purple-600';
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      case 'green':
        return 'bg-green-100 text-green-600';
      case 'orange':
        return 'bg-orange-100 text-orange-600';
      case 'red':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getChangeClass = () => {
    if (!change) return '';
    return change.positive ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className={cn('metric-card', className)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {change && (
            <p className={cn('text-xs flex items-center mt-1', getChangeClass())}>
              <span className={cn('inline-block mr-1', change.positive ? 'rotate-0' : 'rotate-180')}>
                ↑
              </span>
              {change.value} {change.positive ? 'increase' : 'decrease'}
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn('p-3 rounded-lg', getIconContainerClass())}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
