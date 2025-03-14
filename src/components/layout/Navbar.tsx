import React, { useState } from 'react';
import { Bell, Search, Plus, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import UserAvatar from '@/components/auth/UserAvatar';

interface NavbarProps {
  collapsed: boolean;
}

const Navbar = ({ collapsed }: NavbarProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuth();
  
  return (
    <header className="sticky top-0 z-20 w-full glass-nav px-4 py-3">
      <div className="flex items-center justify-between">
        <div className={cn(
          "flex-1 transition-all duration-300",
          collapsed ? "ml-[70px]" : "ml-[250px]"
        )}>
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              className="block w-full py-2 pl-10 pr-3 bg-muted/40 border-0 rounded-lg focus:ring-2 focus:ring-primary/20 focus:bg-background"
              placeholder="Search candidates, jobs, or insights..."
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent transition-colors relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-popover rounded-xl shadow-lg border border-border animate-fade-in p-4 z-50">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Notifications</h3>
                  <button className="text-xs text-primary hover:underline">Mark all as read</button>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 py-2 border-b border-border last:border-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm">New candidate application for <span className="font-medium">Senior Developer</span></p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-2 text-center text-sm text-primary hover:underline">
                  View all notifications
                </button>
              </div>
            )}
          </div>
          
          {user && (
            <button className="py-1.5 px-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>Invite Recruiters</span>
            </button>
          )}
          
          <UserAvatar />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
