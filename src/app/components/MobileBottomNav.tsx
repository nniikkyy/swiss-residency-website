import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { Home, Calendar, User, Menu as MenuIcon } from 'lucide-react';

export function MobileBottomNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Calendar, label: 'Book', path: '/luxury-book' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: MenuIcon, label: 'Menu', path: '/dashboard' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E8DCC4] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
    >
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 transition-all ${
                active ? 'text-[#2F4F46]' : 'text-gray-400'
              }`}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Icon className={`w-5 h-5 ${active ? 'text-[#2F4F46]' : ''}`} strokeWidth={active ? 2.5 : 2} />
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-[#C6A75E]/10 rounded-lg"
                    initial={false}
                  />
                )}
              </motion.div>
              <span className={`text-xs font-medium ${active ? 'text-[#2F4F46]' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
