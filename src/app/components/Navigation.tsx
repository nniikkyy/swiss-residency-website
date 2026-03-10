import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-[1800px] mx-auto px-16 lg:px-24">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <a
            href="/"
            className={`text-2xl tracking-[0.2em] transition-colors ${isScrolled ? 'text-[#1B4332]' : 'text-white'
              }`}
          >
            THE SWISS RESIDENCY
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-14">

            {/* Profile */}
            <button
              onClick={() => navigate('/profile')}
              className={`text-2xl tracking-[0.2em] transition-colors ${isScrolled
                  ? 'text-gray-700 hover:text-[#1B4332]'
                  : 'text-white hover:text-white/80'
                }`}
            >
              PROFILE
            </button>

            {/* Admin (if admin logged in) */}
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className={`text-2xl tracking-[0.2em] transition-colors ${isScrolled
                    ? 'text-orange-600 hover:text-orange-700'
                    : 'text-orange-300 hover:text-orange-100'
                  }`}
              >
                ADMIN
              </button>
            )}

            {/* Book Now */}
            <button
              onClick={() => navigate('/luxury-book')}
              className={`text-2xl tracking-[0.2em] px-8 py-3 border transition-all ${isScrolled
                  ? 'border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-[#1B4332]'
                }`}
            >
              BOOK NOW
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${isScrolled ? 'text-[#1B4332]' : 'text-white'
              }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-8 py-6 space-y-4">

            <button
              onClick={() => navigate('/profile')}
              className="block text-sm tracking-wider text-gray-700 hover:text-[#1B4332] w-full text-left"
            >
              PROFILE
            </button>

            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="block text-sm tracking-wider text-orange-600 hover:text-orange-700 w-full text-left"
              >
                ADMIN
              </button>
            )}

            <button
              onClick={() => navigate('/luxury-book')}
              className="block text-center text-sm tracking-wider px-6 py-2.5 border border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white transition-all"
            >
              BOOK NOW
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}