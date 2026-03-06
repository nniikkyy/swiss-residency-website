import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, X, Zap } from 'lucide-react';
import { useNavigate } from 'react-router';

export function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-20 left-0 right-0 z-40 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
              </div>

              <div className="relative px-6 py-4">
                <button
                  onClick={() => setIsVisible(false)}
                  className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      <Zap className="w-6 h-6 text-white" fill="white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-bold text-lg mb-1">
                      🔥 Limited Time Offer!
                    </h3>
                    <p className="text-sm text-white/90">
                      Book today and save <span className="font-bold">20% OFF</span> on all rooms
                    </p>
                  </div>

                  {/* Countdown */}
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5" />
                    <div className="flex items-center gap-2">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px] text-center">
                        <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                        <div className="text-xs opacity-75">HOURS</div>
                      </div>
                      <div className="text-2xl font-bold">:</div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px] text-center">
                        <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                        <div className="text-xs opacity-75">MINS</div>
                      </div>
                      <div className="text-2xl font-bold">:</div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px] text-center">
                        <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                        <div className="text-xs opacity-75">SECS</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/luxury-book')}
                    className="bg-white text-red-600 px-6 py-3 rounded-full font-bold text-sm hover:bg-opacity-90 transition-all shadow-lg whitespace-nowrap"
                  >
                    BOOK NOW
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
