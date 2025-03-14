
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  Settings,
  HelpCircle,
  FileText
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const { pathname } = useLocation();
  const { signOut } = useAuth();

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/'
    },
    {
      name: 'Resume Analysis',
      icon: <FileText className="h-5 w-5" />,
      path: '/resume'
    },
    {
      name: 'Candidates',
      icon: <Users className="h-5 w-5" />,
      path: '/candidates'
    },
    {
      name: 'Jobs',
      icon: <Briefcase className="h-5 w-5" />,
      path: '/jobs'
    },
    {
      name: 'Interviews',
      icon: <Calendar className="h-5 w-5" />,
      path: '/interviews'
    }
  ];

  const bottomItems = [
    {
      name: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      path: '/settings'
    },
    {
      name: 'Help',
      icon: <HelpCircle className="h-5 w-5" />,
      path: '/help'
    }
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 flex h-full flex-col border-r bg-card transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex h-14 items-center px-4 py-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-purple-500 flex items-center justify-center">
              <span className="font-bold text-white text-sm">RA</span>
            </div>
            <span className="text-lg font-semibold">Recruiter AI</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto h-8 w-8 rounded-md bg-purple-500 flex items-center justify-center">
            <span className="font-bold text-white text-sm">RA</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "ml-auto h-8 w-8",
            collapsed && "rotate-180"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                pathname === item.path && "bg-accent text-accent-foreground"
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto px-2 py-2">
        <Separator className="mb-2" />
        <nav className="grid gap-1">
          {bottomItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                pathname === item.path && "bg-accent text-accent-foreground"
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            {!collapsed && <span>Logout</span>}
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
