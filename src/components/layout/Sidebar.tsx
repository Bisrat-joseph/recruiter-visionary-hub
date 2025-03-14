
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Brain, 
  BarChart3, 
  MessageCircle, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Candidate Insights', path: '/candidates' },
    { icon: Briefcase, label: 'Job Postings', path: '/jobs' },
    { icon: Brain, label: 'AI Analysis', path: '/ai-analysis' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: MessageCircle, label: 'Communication', path: '/communication' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar sticky top-0 border-r border-sidebar-border transition-all duration-300 ease-in-out z-30",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-purple-500 flex items-center justify-center">
                <span className="font-bold text-white">RA</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">Recruiter AI</span>
            </div>
          )}
          {collapsed && (
            <div className="w-full flex justify-center">
              <div className="w-9 h-9 rounded-md bg-purple-500 flex items-center justify-center">
                <span className="font-bold text-white">RA</span>
              </div>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            className="w-6 h-6 rounded-full flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNavigate(item.path)}
                  className={cn(
                    "menu-item w-full",
                    location.pathname === item.path && "active"
                  )}
                >
                  <item.icon size={18} />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-sidebar-border mt-auto">
          <div className={cn(
            "rounded-lg p-3 bg-sidebar-accent flex items-center",
            collapsed ? "justify-center" : "justify-between"
          )}>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-sidebar-accent-foreground">Free Plan</span>
                <div className="mt-1 w-full bg-sidebar-border rounded-full h-1.5">
                  <div className="bg-purple-500 h-1.5 rounded-full w-[45%]"></div>
                </div>
              </div>
            )}
            <button className={cn(
              "text-xs bg-sidebar-primary text-sidebar-primary-foreground px-2 py-1 rounded font-medium",
              collapsed ? "w-full" : ""
            )}>
              {collapsed ? "Up" : "Upgrade"}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
