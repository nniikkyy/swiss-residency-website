import { motion } from 'motion/react';
import { UtensilsCrossed, Coffee, Wine, Clock, ChefHat } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function DiningExperience() {
  const diningOptions = [
    {
      icon: UtensilsCrossed,
      title: 'Multi-Cuisine Restaurant',
      description: 'Savor authentic North Indian, Chinese, and Continental delicacies',
      hours: '7:00 AM - 11:00 PM',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop'
    },
    {
      icon: Coffee,
      title: 'All-Day Dining',
      description: 'Complimentary breakfast, tea & coffee service',
      hours: '24/7 Available',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop'
    },
    {
      icon: ChefHat,
      title: 'In-Room Dining',
      description: 'Enjoy gourmet meals in the comfort of your room',
      hours: '7:00 AM - 11:00 PM',
      image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop'
    }
  ];

  const specialties = [
    { name: 'Punjabi Cuisine', icon: '🍛' },
    { name: 'Chinese Delights', icon: '🥢' },
    { name: 'Continental', icon: '🍝' },
    { name: 'Fresh Beverages', icon: '🥤' },
    { name: 'Desserts', icon: '🍰' },
    { name: 'Healthy Options', icon: '🥗' }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[#2F4F46] text-xs tracking-[0.3em] mb-6">CULINARY EXCELLENCE</div>
          <h2 style={{ fontFamily: 'Playfair Display' }} className="text-4xl md:text-5xl text-[#2F4F46] mb-6 font-semibold">
            Dining & Experiences
          </h2>
          <div className="w-10 h-px bg-[#C6A75E] mx-auto mb-6"></div>
          <p className="text-[#8A8A8A] text-base max-w-2xl mx-auto leading-relaxed">
            Indulge in exceptional culinary experiences crafted by our expert chefs
          </p>
        </div>

        {/* Dining Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {diningOptions.map((option, idx) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all group"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <ImageWithFallback
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-[#2F4F46]" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#2F4F46] mb-2">
                    {option.title}
                  </h3>
                  <p className="text-[#8A8A8A] text-sm mb-4 leading-relaxed">
                    {option.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#C6A75E] text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{option.hours}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Specialties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#F7F6F2] to-[#E8F3EE] rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 style={{ fontFamily: 'Playfair Display' }} className="text-2xl md:text-3xl text-[#2F4F46] mb-3 font-semibold">
              Our Specialties
            </h3>
            <div className="w-10 h-px bg-[#C6A75E] mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {specialties.map((specialty, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="text-3xl mb-2">{specialty.icon}</div>
                <p className="text-[#2F4F46] text-sm font-medium">{specialty.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
