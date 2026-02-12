import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Toasts } from './Toasts';
import { useState, useEffect, useRef } from 'react';

// Primary nav items (always visible)
const primaryNav = [
  { to: '/', label: 'Dashboard' },
  { to: '/inbox', label: 'Inbox' },
  { to: '/campaigns', label: 'Campaigns' },
  { to: '/templates', label: 'Funnel Templates' },
  { to: '/leads', label: 'Leads' },
];

// "More" dropdown items
const moreNav = [
  { to: '/builder', label: 'AI Builder' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/apollo', label: 'Apollo Search' },
  { to: '/settings', label: 'Settings' },
  { to: '/users', label: 'Users', adminOnly: true },
] as Array<{ to: string; label: string; adminOnly?: boolean }>;

export function AppLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {}
    }
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
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

  const filteredMoreNav = moreNav.filter((item) => !item.adminOnly || user?.role === 'admin');

  return (
    <div className="min-h-screen">
      <Toasts />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/paycile-logo.svg" alt="Paycile" className="h-7" />
            <span className="text-sm font-medium text-gray-500 border-l border-gray-300 pl-3">Marketing Automation</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {primaryNav.map((item) => (
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

            {/* More Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className={`py-2 font-medium transition-colors flex items-center gap-1 ${showMoreMenu ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
              >
                More
                <svg className={`w-3.5 h-3.5 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showMoreMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {filteredMoreNav.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm transition-colors ${isActive ? 'text-primary-600 bg-primary-50 font-medium' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'}`
                      }
                      onClick={() => setShowMoreMenu(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
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
            <div className="flex items-center gap-4">
              <a
                href="/platform-architecture.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Platform Architecture
              </a>
              <span className="text-gray-300">|</span>
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} Paycile. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
