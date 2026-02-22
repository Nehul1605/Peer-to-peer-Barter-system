import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Users, 
  Video, 
  Coins, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/profile', icon: User, label: 'Skill Profile' },
    { path: '/dashboard/matching', icon: Users, label: 'Find Matches' },
    { path: '/dashboard/sessions', icon: Video, label: 'Sessions' },
    { path: '/dashboard/credits', icon: Coins, label: 'Credits' },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-white flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-neutral-900/40 backdrop-blur-xl border-r border-neutral-800 h-screen sticky top-0">
        {/* Logo */}
        <div className="p-6 border-b border-neutral-800">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            SkillBarter
          </Link>
          <p className="text-sm text-neutral-400 mt-1">Exchange & Learn</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 text-white border border-brand-primary/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/40'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-neutral-800">
          <div className="bg-neutral-900/40 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center text-lg font-bold">
                {user?.name?.charAt(0) || <User className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-neutral-400 truncate">{user?.email || ''}</p>
              </div>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-neutral-400 hover:text-white hover:bg-neutral-900/40"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
          {/* Mobile Header */}
          <div className="lg:hidden sticky top-0 z-50 bg-[var(--background)]/95 backdrop-blur-xl border-b border-neutral-800">
            <div className="flex items-center justify-between p-4">
              <Link to="/" className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                SkillBarter
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-neutral-900/40 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="border-t border-neutral-800 p-4 space-y-2 bg-[var(--background)]">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 text-white border border-brand-primary/30'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900/40'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                 <div className="pt-4 mt-2 border-t border-neutral-800">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center text-sm font-bold">
                             {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                             <p className="text-sm font-medium">{user?.name}</p>
                             <p className="text-xs text-neutral-400">{user?.email}</p>
                        </div>
                    </div>
                    <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="w-full justify-start text-neutral-400 hover:text-white hover:bg-neutral-900/40"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </Button>
                </div>
              </div>
            )}
          </div>

          <main className="flex-1 overflow-auto p-4 lg:p-8">
            <Outlet />
          </main>
      </div>    
    </div>
  );
}
