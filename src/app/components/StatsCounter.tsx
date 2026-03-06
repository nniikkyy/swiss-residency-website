import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: 'easeOut' });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <div ref={ref} className="text-center">
      <motion.div style={{ fontFamily: 'Playfair Display' }} className="text-5xl md:text-6xl text-[#2F4F46] font-bold mb-2">
        <motion.span>{rounded}</motion.span>
        <span className="text-[#C6A75E]">{suffix}</span>
      </motion.div>
    </div>
  );
}

export function StatsCounter() {
  const stats = [
    { value: 500, suffix: '+', label: 'Happy Guests' },
    { value: 4.8, suffix: '★', label: 'Average Rating' },
    { value: 10, suffix: '+', label: 'Years Experience' },
    { value: 100, suffix: '%', label: 'Satisfaction' }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="text-center bg-[#F7F6F2] rounded-[18px] p-8 shadow-[0_6px_20px_rgba(0,0,0,0.05)]"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-[#8A8A8A] text-sm uppercase tracking-wider mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
