import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { LayoutDashboard, Calendar, FileText, User, LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
    window.location.reload();
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'My Bookings', path: '/my-bookings' },
    { icon: FileText, label: 'Invoices', path: '/invoices' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-20">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 shadow-sm sticky top-32">
              <h2 className="text-lg text-[#1B4332] tracking-wider mb-6 font-light">
                MY ACCOUNT
              </h2>
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm tracking-wide transition-colors ${
                        isActive
                          ? 'bg-[#1B4332] text-white'
                          : 'text-gray-700 hover:bg-[#E8DCC4]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm tracking-wide text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors mt-4 border-t pt-4"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
