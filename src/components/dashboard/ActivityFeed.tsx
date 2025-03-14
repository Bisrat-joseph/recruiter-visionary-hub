
import React from 'react';
import { UserPlus, Calendar, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import ChartContainer from '../ui/ChartContainer';
import { cn } from '@/lib/utils';

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  iconBg?: string;
}

const ActivityItem = ({ icon, title, description, time, iconBg = 'bg-purple-100' }: ActivityItemProps) => (
  <div className="activity-item">
    <div className={cn('w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0', iconBg)}>
      {icon}
    </div>
    <div className="flex-1">
      <p className="font-medium text-sm">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      <p className="text-xs text-muted-foreground mt-1">{time}</p>
    </div>
  </div>
);

const ActivityFeed = () => {
  const activities = [
    {
      icon: <UserPlus className="w-4 h-4 text-purple-600" />,
      title: 'New Application Received',
      description: 'John Doe applied for Senior Developer position',
      time: '25 minutes ago',
      iconBg: 'bg-purple-100'
    },
    {
      icon: <Calendar className="w-4 h-4 text-blue-600" />,
      title: 'Interview Scheduled',
      description: 'Technical interview with Emily Brown for Product Manager',
      time: '2 hours ago',
      iconBg: 'bg-blue-100'
    },
    {
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
      title: 'Candidate Hired',
      description: 'Michael Chen accepted the offer for UX Designer',
      time: '5 hours ago',
      iconBg: 'bg-green-100'
    },
    {
      icon: <AlertCircle className="w-4 h-4 text-orange-600" />,
      title: 'Application Rejected',
      description: 'Sarah Johnson was not a good fit for Marketing Lead',
      time: 'Yesterday',
      iconBg: 'bg-orange-100'
    },
    {
      icon: <MessageSquare className="w-4 h-4 text-blue-600" />,
      title: 'New Feedback Added',
      description: 'Team lead provided feedback for David Wang',
      time: 'Yesterday',
      iconBg: 'bg-blue-100'
    }
  ];

  return (
    <ChartContainer 
      title="Activity Feed" 
      action={
        <button className="text-xs text-primary hover:underline">View All</button>
      }
    >
      <div className="space-y-1 max-h-[340px] overflow-y-auto pr-2">
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            icon={activity.icon}
            title={activity.title}
            description={activity.description}
            time={activity.time}
            iconBg={activity.iconBg}
          />
        ))}
      </div>
    </ChartContainer>
  );
};

export default ActivityFeed;
