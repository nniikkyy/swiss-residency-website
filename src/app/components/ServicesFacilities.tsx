import { motion } from 'motion/react';
import { 
  Wifi, Clock, UtensilsCrossed, Droplets, Wind, Zap, ShieldCheck, Video,
  Car, Coffee, Flame, Sparkles, Utensils, Shield, Bed, Users, Globe
} from 'lucide-react';

export function ServicesFacilities() {
  const services = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Wind, label: 'Air Conditioning' },
    { icon: Coffee, label: 'Breakfast, Tea & Coffee' },
    { icon: Car, label: 'Free Parking' },
    { icon: Clock, label: '24/7 Reception' },
    { icon: UtensilsCrossed, label: 'Launch & Dinner' },
    { icon: Utensils, label: 'Room Service' },
    { icon: Droplets, label: 'Hot Water' },
    { icon: Flame, label: 'Heater' },
    { icon: Sparkles, label: 'Daily Housekeeping' },
    { icon: Zap, label: 'Power Backup' },
    { icon: ShieldCheck, label: 'CCTV Security' },
    { icon: Video, label: 'Smart TV' },
    { icon: Shield, label: 'Safe & Secure' },
    { icon: Bed, label: 'Premium Bedding' },
    { icon: Users, label: 'Family Friendly' },
    { icon: Globe, label: 'Travel Assistance' }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[#2F4F46] text-xs tracking-[0.3em] mb-6">SERVICES & FACILITIES</div>
          <h2 style={{ fontFamily: 'Playfair Display' }} className="text-4xl md:text-5xl text-[#2F4F46] mb-6 font-semibold">
            Amenities for Your Comfort
          </h2>
          <div className="w-10 h-px bg-[#C6A75E] mx-auto mb-6"></div>
          <p className="text-[#8A8A8A] text-base max-w-2xl mx-auto leading-relaxed">
            Everything you need for a comfortable and convenient stay
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-[#F7F6F2] border border-[#EAEAEA] flex items-center justify-center mb-4 group-hover:bg-[#E8F3EE] group-hover:border-[#C6A75E] transition-all">
                  <Icon className="w-7 h-7 text-[#2F4F46]" strokeWidth={1.5} />
                </div>

                {/* Label */}
                <p className="text-sm text-[#2F4F46] font-medium">
                  {service.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}