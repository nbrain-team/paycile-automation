import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Toasts } from './Toasts';
import { useState, useEffect } from 'react';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/inbox', label: 'Inbox' },
  { to: '/campaigns', label: 'Campaigns' },
  { to: '/builder', label: 'Builder' },
  { to: '/templates', label: 'Funnel Templates' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/leads', label: 'Leads' },
  { to: '/apollo', label: 'Apollo Search' },
  { to: '/settings', label: 'Settings' },
];

export function AppLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen">
      <Toasts />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/paycile-logo.svg" alt="Paycile" className="h-7" />
            <span className="text-sm font-medium text-gray-500 border-l border-gray-300 pl-3">Marketing Automation</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `py-2 font-medium transition-colors ${isActive ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-700 hover:text-primary-600'}`
                }
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3 relative">
            <div className="text-right mr-2 hidden sm:block">
              <div className="text-sm font-medium text-gray-900">{user?.name || 'User'}</div>
              <div className="text-xs text-gray-500">{user?.role || 'user'}</div>
            </div>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm hover:bg-blue-700 transition-colors"
              title={user?.email}
            >
              {getUserInitials()}
            </button>
            {showUserMenu && (
              <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500 truncate">{user?.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 bg-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/paycile-logo.svg" alt="Paycile" className="h-6 opacity-60" />
            </div>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Paycile. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


