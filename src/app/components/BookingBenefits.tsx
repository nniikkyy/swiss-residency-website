import { motion } from 'motion/react';
import { BadgeCheck, X, CreditCard } from 'lucide-react';

export function BookingBenefits() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-gradient-to-r from-[#2F4F46] to-[#243C36] text-white py-4 px-6"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8 text-sm">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-[#C6A75E] flex-shrink-0" strokeWidth={2} />
            <span className="font-medium">Best Price Guarantee</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-white/20"></div>
          <div className="flex items-center gap-2">
            <X className="w-5 h-5 text-[#C6A75E] flex-shrink-0" strokeWidth={2} />
            <span className="font-medium">Free Cancellation</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-white/20"></div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#C6A75E] flex-shrink-0" strokeWidth={2} />
            <span className="font-medium">No Booking Fees</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
