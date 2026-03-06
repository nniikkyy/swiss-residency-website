import { motion } from 'motion/react';
import { MapPin, Shield, Coffee, Car, Wifi, Briefcase } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      icon: MapPin,
      title: 'Premium Location',
      description: 'Near India Expo Mart & Metro Station'
    },
    {
      icon: Shield,
      title: 'Sanitized & Safe',
      description: 'Regular sanitization & safety protocols'
    },
    {
      icon: Coffee,
      title: 'Complimentary Breakfast',
      description: 'Start your day with delicious breakfast'
    },
    {
      icon: Car,
      title: 'Free Parking',
      description: 'Secure parking available for guests'
    },
    {
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Stay connected throughout your stay'
    },
    {
      icon: Briefcase,
      title: 'Business Friendly',
      description: 'Perfect for corporate travelers'
    }
  ];

  return (
    <section className="py-20 px-6 bg-[#F7F6F2]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[#2F4F46] text-xs tracking-[0.3em] mb-6">WHY CHOOSE US</div>
          <h2 style={{ fontFamily: 'Playfair Display' }} className="text-4xl md:text-5xl text-[#2F4F46] mb-6 font-semibold">
            Your Comfort is Our Priority
          </h2>
          <div className="w-10 h-px bg-[#C6A75E] mx-auto mb-6"></div>
          <p className="text-[#8A8A8A] text-base max-w-2xl mx-auto leading-relaxed">
            Experience exceptional hospitality with modern amenities and personalized service
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="text-center"
              >
                {/* Icon Circle */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-20 h-20 rounded-full bg-[#E8F3EE] flex items-center justify-center mx-auto mb-6"
                >
                  <Icon className="w-9 h-9 text-[#2F4F46]" strokeWidth={1.5} />
                </motion.div>

                {/* Title */}
                <h3 style={{ fontFamily: 'Playfair Display' }} className="text-xl text-[#2F4F46] mb-3 font-semibold">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[#8A8A8A] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
