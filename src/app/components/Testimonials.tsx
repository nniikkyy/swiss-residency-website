import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Delhi',
      rating: 5,
      text: 'Excellent location near India Expo Mart. The rooms are clean, staff is courteous, and the overall experience was fantastic. Highly recommended for business travelers!',
      date: 'February 2026'
    },
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      text: 'Beautiful property with modern amenities. The breakfast was delicious and the service was impeccable. Perfect for a weekend getaway in Greater Noida.',
      date: 'January 2026'
    },
    {
      name: 'Amit Verma',
      location: 'Bangalore',
      rating: 5,
      text: 'Very convenient location with metro station nearby. Professional staff and comfortable rooms. Great value for money. Will definitely stay here again.',
      date: 'January 2026'
    },
    {
      name: 'Sarah Johnson',
      location: 'London, UK',
      rating: 5,
      text: 'Exceptional hospitality! The team went above and beyond to make our stay comfortable. Clean rooms, excellent location, and wonderful service.',
      date: 'December 2025'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[#2F4F46] text-xs tracking-[0.3em] mb-6">TESTIMONIALS</div>
          <h2 style={{ fontFamily: 'Playfair Display' }} className="text-4xl md:text-5xl text-[#2F4F46] mb-6 font-semibold">
            What Our Guests Say
          </h2>
          <div className="w-10 h-px bg-[#C6A75E] mx-auto mb-6"></div>
          <p className="text-[#8A8A8A] text-base max-w-2xl mx-auto leading-relaxed">
            Discover why travelers choose The Swiss Residency for their stay in Greater Noida
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-[#F7F6F2] rounded-[18px] p-8 md:p-12 shadow-[0_6px_20px_rgba(0,0,0,0.05)]"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-12 h-12 text-[#C6A75E] opacity-30" strokeWidth={1.5} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C6A75E] text-[#C6A75E]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#2F4F46] text-lg md:text-xl leading-relaxed mb-8 font-light">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between border-t border-[#EAEAEA] pt-6">
                <div>
                  <h4 style={{ fontFamily: 'Playfair Display' }} className="text-xl text-[#2F4F46] font-semibold mb-1">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-[#8A8A8A]">{testimonials[currentIndex].location}</p>
                </div>
                <div className="text-xs text-[#8A8A8A] uppercase tracking-wider">
                  {testimonials[currentIndex].date}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white border-2 border-[#2F4F46] flex items-center justify-center hover:bg-[#2F4F46] hover:text-white transition-colors group"
            >
              <ChevronLeft className="w-5 h-5 text-[#2F4F46] group-hover:text-white" strokeWidth={2} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-[#C6A75E] w-8' : 'bg-[#EAEAEA]'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="w-12 h-12 rounded-full bg-white border-2 border-[#2F4F46] flex items-center justify-center hover:bg-[#2F4F46] hover:text-white transition-colors group"
            >
              <ChevronRight className="w-5 h-5 text-[#2F4F46] group-hover:text-white" strokeWidth={2} />
            </motion.button>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <motion.a
              href="https://www.google.com/search?q=The+Swiss+Residency+Greater+Noida+reviews"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block bg-transparent border-2 border-[#2F4F46] text-[#2F4F46] px-8 py-3 rounded-[14px] text-sm tracking-wider font-medium hover:bg-[#2F4F46] hover:text-white transition-colors"
            >
              READ MORE REVIEWS
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
