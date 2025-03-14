
import React from 'react';
import { Users, Briefcase, CheckCircle, Brain, Clock } from 'lucide-react';
import MetricCard from '../ui/MetricCard';

const MetricsPanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <MetricCard
        title="Total Candidates"
        value="1,387"
        change={{ value: "12%", positive: true }}
        icon={Users}
        color="purple"
      />
      <MetricCard
        title="Active Job Postings"
        value="48"
        change={{ value: "4%", positive: true }}
        icon={Briefcase}
        color="blue"
      />
      <MetricCard
        title="Successful Hires"
        value="129"
        change={{ value: "7%", positive: true }}
        icon={CheckCircle}
        color="green"
      />
      <MetricCard
        title="AI Match Accuracy"
        value="92%"
        change={{ value: "3%", positive: true }}
        icon={Brain}
        color="orange"
      />
      <MetricCard
        title="Avg. Hiring Time"
        value="18 days"
        change={{ value: "5%", positive: false }}
        icon={Clock}
        color="red"
      />
    </div>
  );
};

export default MetricsPanel;
