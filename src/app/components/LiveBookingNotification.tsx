import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, MapPin } from 'lucide-react';

interface Notification {
  id: number;
  name: string;
  room: string;
  location: string;
  timeAgo: string;
}

export function LiveBookingNotification() {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [show, setShow] = useState(false);

  // Mock booking notifications
  const notifications: Notification[] = [
    { id: 1, name: 'Rajesh K.', room: 'Deluxe Room', location: 'Delhi', timeAgo: '2 minutes ago' },
    { id: 2, name: 'Priya S.', room: 'Suite', location: 'Noida', timeAgo: '5 minutes ago' },
    { id: 3, name: 'Amit P.', room: 'Standard Room', location: 'Gurgaon', timeAgo: '8 minutes ago' },
    { id: 4, name: 'Sneha M.', room: 'Deluxe Room', location: 'Mumbai', timeAgo: '12 minutes ago' },
    { id: 5, name: 'Vikram R.', room: 'Suite', location: 'Bangalore', timeAgo: '15 minutes ago' }
  ];

  useEffect(() => {
    let notificationIndex = 0;

    const showNotification = () => {
      setCurrentNotification(notifications[notificationIndex]);
      setShow(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setShow(false);
      }, 4000);

      // Move to next notification
      notificationIndex = (notificationIndex + 1) % notifications.length;
    };

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(showNotification, 3000);

    // Then show every 10 seconds
    const interval = setInterval(showNotification, 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && currentNotification && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 z-40 max-w-sm"
        >
          <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#E8DCC4] overflow-hidden">
            {/* Green success bar */}
            <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            
            <div className="p-4 flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" fill="currentColor" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-[#2F4F46]">
                    {currentNotification.name}
                  </p>
                  <span className="text-xs text-green-600 font-medium">booked!</span>
                </div>
                
                <p className="text-xs text-[#8A8A8A] mb-2">
                  {currentNotification.room}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-[#8A8A8A]">
                    <MapPin className="w-3 h-3" />
                    <span>{currentNotification.location}</span>
                  </div>
                  <span className="text-xs text-[#8A8A8A]">
                    {currentNotification.timeAgo}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
