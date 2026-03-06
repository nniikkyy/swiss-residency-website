import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const navigate = useNavigate();
  
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?w=1920&h=1080&fit=crop')`
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="text-white text-sm tracking-[0.3em] mb-6 opacity-90">
          WELCOME TO
        </div>
        
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl mb-8 tracking-wider font-light max-w-5xl leading-tight">
          The Swiss Residency
        </h1>

        <div className="w-24 h-px bg-white/50 mb-8"></div>
        
        <p className="text-white text-lg md:text-xl mb-12 max-w-2xl tracking-wide opacity-90 font-light">
          The best business class accommodations in Greater Noida
        </p>

        <div>
          <Button 
            size="lg"
            onClick={() => navigate('/luxury-book')}
            className="bg-transparent hover:bg-white text-white hover:text-[#1B4332] border-2 border-white px-10 py-6 text-sm tracking-[0.2em] transition-all duration-300"
          >
            BOOK NOW
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/70">
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}