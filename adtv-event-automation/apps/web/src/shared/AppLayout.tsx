import { NavLink, Outlet } from 'react-router-dom';
import { Toasts } from './Toasts';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/inbox', label: 'Inbox' },
  { to: '/campaigns', label: 'Campaigns' },
  { to: '/templates', label: 'Funnel Templates' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/leads', label: 'Leads' },
  { to: '/apollo', label: 'Apollo Search' },
  { to: '/settings', label: 'Settings' },
];

export function AppLayout() {
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
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
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


