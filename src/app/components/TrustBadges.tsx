import { motion } from 'motion/react';
import { ShieldCheck, Award, Star, Users } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'COVID-Safe',
      subtitle: 'Certified'
    },
    {
      icon: Award,
      title: 'Verified on',
      subtitle: 'Google'
    },
    {
      icon: Star,
      title: '4.8★ Rating',
      subtitle: '200+ Reviews'
    },
    {
      icon: Users,
      title: 'Trusted by',
      subtitle: '500+ Guests'
    }
  ];

  return (
    <section className="py-12 px-6 bg-[#F7F6F2] border-t border-[#EAEAEA]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#E8F3EE] flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-[#2F4F46]" strokeWidth={1.5} />
                </div>
                <div className="text-sm text-[#2F4F46] font-semibold leading-tight">
                  {badge.title}
                </div>
                <div className="text-xs text-[#8A8A8A] mt-1">
                  {badge.subtitle}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
