import { motion } from 'motion/react';
import { Award, Star, Shield, TrendingUp, Users, Heart } from 'lucide-react';

export function Awards() {
  const achievements = [
    {
      icon: Award,
      title: 'Best Business Hotel',
      subtitle: 'Greater Noida 2024',
      color: 'from-amber-500 to-yellow-600'
    },
    {
      icon: Star,
      title: '4.8/5.0 Rating',
      subtitle: '500+ Guest Reviews',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Shield,
      title: 'Safety Certified',
      subtitle: 'ISO 9001:2015',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: TrendingUp,
      title: 'Top Rated',
      subtitle: 'TripAdvisor Excellence',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const certifications = [
    { name: 'Fire Safety', icon: '🔥' },
    { name: 'Hygiene Standards', icon: '✨' },
    { name: 'Eco-Friendly', icon: '🌱' },
    { name: 'Quality Service', icon: '⭐' },
    { name: 'Guest Satisfaction', icon: '😊' },
    { name: 'Verified Partner', icon: '✓' }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#F7F6F2] to-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[#2F4F46] text-xs tracking-[0.3em] mb-6">RECOGNITION & EXCELLENCE</div>
          <h2 style={{ fontFamily: 'Playfair Display' }} className="text-4xl md:text-5xl text-[#2F4F46] mb-6 font-semibold">
            Awards & Certifications
          </h2>
          <div className="w-10 h-px bg-[#C6A75E] mx-auto mb-6"></div>
          <p className="text-[#8A8A8A] text-base max-w-2xl mx-auto">
            Committed to excellence and recognized for outstanding hospitality
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, idx) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all overflow-hidden group"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                
                {/* Icon */}
                <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${achievement.color} mb-4 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-[#2F4F46] mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-[#8A8A8A]">
                  {achievement.subtitle}
                </p>

                {/* Shine Effect */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
        >
          <div className="text-center mb-8">
            <h3 style={{ fontFamily: 'Playfair Display' }} className="text-2xl text-[#2F4F46] mb-2 font-semibold">
              Certified Standards
            </h3>
            <p className="text-[#8A8A8A] text-sm">Maintaining the highest quality benchmarks</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#F7F6F2] to-[#E8F3EE] rounded-xl border border-[#E8DCC4] hover:border-[#C6A75E] transition-all cursor-pointer"
              >
                <div className="text-3xl mb-2">{cert.icon}</div>
                <p className="text-xs text-[#2F4F46] font-medium text-center">{cert.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '500+', label: 'Happy Guests', icon: Users },
            { value: '4.8', label: 'Average Rating', icon: Star },
            { value: '95%', label: 'Repeat Customers', icon: Heart },
            { value: '24/7', label: 'Support Available', icon: Shield }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: 'spring' }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#C6A75E] to-[#D4AF37] rounded-full mb-3">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#2F4F46] mb-1">{stat.value}</div>
                <div className="text-sm text-[#8A8A8A]">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
