import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check login status from localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsLoggedIn(loggedIn);
    setIsAdmin(adminStatus);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className={`text-xl tracking-[0.2em] transition-colors ${
            isScrolled ? 'text-[#1B4332]' : 'text-white'
          }`}>
            THE SWISS RESIDENCY
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {!isLoggedIn ? (
              <>
                <a 
                  href="/#about" 
                  className={`text-sm tracking-wider transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-[#1B4332]' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  ABOUT
                </a>
                <a 
                  href="/#rooms" 
                  className={`text-sm tracking-wider transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-[#1B4332]' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  ROOMS & SUITES
                </a>
                <a 
                  href="/#amenities" 
                  className={`text-sm tracking-wider transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-[#1B4332]' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  AMENITIES
                </a>
                <a 
                  href="/#location" 
                  className={`text-sm tracking-wider transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-[#1B4332]' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  LOCATION
                </a>
                <a 
                  href="/#gallery" 
                  className={`text-sm tracking-wider transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-[#1B4332]' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  GALLERY
                </a>
                <a 
                  href="/#contact" 
                  className={`text-sm tracking-wider transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-[#1B4332]' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  CONTACT
                </a>
                <button 
                  onClick={handleLogin}
                  className={`text-sm tracking-wider transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-[#1B4332]' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  LOGIN
                </button>
                <button 
                  onClick={() => navigate('/luxury-book')}
                  className={`text-sm tracking-wider px-6 py-2.5 border transition-all ${
                    isScrolled 
                      ? 'border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white' 
                      : 'border-white text-white hover:bg-white hover:text-[#1B4332]'
                  }`}
                >
                  BOOK NOW
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/luxury-book')}
                  className={`text-sm tracking-wider transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-[#1B4332]' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  ROOMS & SUITES
                </button>
                <button 
                  onClick={() => navigate('/profile')}
                  className={`text-sm tracking-wider transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-[#1B4332]' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  PROFILE
                </button>
                {isAdmin && (
                  <button 
                    onClick={() => navigate('/admin')}
                    className={`text-sm tracking-wider transition-colors ${
                      isScrolled 
                        ? 'text-orange-600 hover:text-orange-700' 
                        : 'text-orange-300 hover:text-orange-100'
                    }`}
                  >
                    ADMIN
                  </button>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${isScrolled ? 'text-[#1B4332]' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-8 py-6 space-y-4">
            {!isLoggedIn ? (
              <>
                <a href="/#about" className="block text-sm tracking-wider text-gray-700 hover:text-[#1B4332]">
                  ABOUT
                </a>
                <a href="/#rooms" className="block text-sm tracking-wider text-gray-700 hover:text-[#1B4332]">
                  ROOMS & SUITES
                </a>
                <a href="/#amenities" className="block text-sm tracking-wider text-gray-700 hover:text-[#1B4332]">
                  AMENITIES
                </a>
                <a href="/#location" className="block text-sm tracking-wider text-gray-700 hover:text-[#1B4332]">
                  LOCATION
                </a>
                <a href="/#gallery" className="block text-sm tracking-wider text-gray-700 hover:text-[#1B4332]">
                  GALLERY
                </a>
                <a href="/#contact" className="block text-sm tracking-wider text-gray-700 hover:text-[#1B4332]">
                  CONTACT
                </a>
                <button 
                  onClick={handleLogin}
                  className="block text-sm tracking-wider text-gray-700 hover:text-[#1B4332] w-full text-left"
                >
                  LOGIN
                </button>
                <button 
                  onClick={() => navigate('/book')}
                  className="block text-center text-sm tracking-wider px-6 py-2.5 border border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white transition-all"
                >
                  BOOK NOW
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/luxury-book')}
                  className="block text-sm tracking-wider text-gray-700 hover:text-[#1B4332] w-full text-left"
                >
                  ROOMS & SUITES
                </button>
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
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}