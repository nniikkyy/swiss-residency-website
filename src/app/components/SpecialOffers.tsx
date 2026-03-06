import { motion } from 'motion/react';
import { Tag, Calendar, Building2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export function SpecialOffers() {
  const navigate = useNavigate();

  const offers = [
    {
      icon: Calendar,
      badge: 'SAVE 15%',
      title: 'Early Bird Discount',
      description: 'Book 7 days in advance and save 15% on your stay',
      terms: 'Valid for stays until June 2026',
      color: '#C6A75E'
    },
    {
      icon: Tag,
      badge: 'SPECIAL',
      title: 'Weekend Getaway',
      description: 'Special 2-night weekend package with complimentary breakfast',
      terms: 'Friday to Sunday stays',
      color: '#2F4F46'
    },
    {
      icon: Building2,
      badge: 'CORPORATE',
      title: 'Corporate Rates',
      description: 'Exclusive discounted rates for business travelers and companies',
      terms: 'Contact us for custom packages',
      color: '#243C36'
    }
  ];

  return (
    <section className="py-20 px-6 bg-[#F7F6F2]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[#2F4F46] text-xs tracking-[0.3em] mb-6">SPECIAL OFFERS</div>
          <h2 style={{ fontFamily: 'Playfair Display' }} className="text-4xl md:text-5xl text-[#2F4F46] mb-6 font-semibold">
            Exclusive Deals for You
          </h2>
          <div className="w-10 h-px bg-[#C6A75E] mx-auto mb-6"></div>
          <p className="text-[#8A8A8A] text-base max-w-2xl mx-auto leading-relaxed">
            Take advantage of our special offers and enjoy exceptional value during your stay
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, idx) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="relative bg-white rounded-[18px] p-8 shadow-[0_6px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all overflow-hidden group"
              >
                {/* Badge */}
                <div className="absolute top-6 right-6">
                  <div
                    style={{ backgroundColor: offer.color }}
                    className="px-3 py-1 rounded-full text-white text-xs font-semibold tracking-wider"
                  >
                    {offer.badge}
                  </div>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-[#E8F3EE] flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-[#2F4F46]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 style={{ fontFamily: 'Playfair Display' }} className="text-2xl text-[#2F4F46] mb-3 font-semibold">
                  {offer.title}
                </h3>

                {/* Description */}
                <p className="text-[#2F4F46] text-base leading-relaxed mb-4">
                  {offer.description}
                </p>

                {/* Terms */}
                <p className="text-[#8A8A8A] text-xs mb-6 pb-6 border-b border-[#EAEAEA]">
                  {offer.terms}
                </p>

                {/* CTA */}
                <motion.button
                  onClick={() => navigate('/luxury-book')}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-[#C6A75E] font-medium text-sm tracking-wider group-hover:gap-3 transition-all"
                >
                  BOOK NOW
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </motion.button>

                {/* Hover Effect Border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C6A75E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
