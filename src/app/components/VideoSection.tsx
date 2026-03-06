import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[#2F4F46] text-xs tracking-[0.3em] mb-6">VIRTUAL TOUR</div>
          <h2 style={{ fontFamily: 'Playfair Display' }} className="text-4xl md:text-5xl text-[#2F4F46] mb-6 font-semibold">
            Experience The Swiss Residency
          </h2>
          <div className="w-10 h-px bg-[#C6A75E] mx-auto mb-6"></div>
          <p className="text-[#8A8A8A] text-base max-w-2xl mx-auto leading-relaxed">
            Take a virtual tour of our property and discover the luxury that awaits you
          </p>
        </div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative aspect-video rounded-[18px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.1)] group"
        >
          {/* Thumbnail */}
          {!isPlaying && (
            <>
              <ImageWithFallback
                src="https://source.unsplash.com/1200x675/?luxury,hotel,lobby"
                alt="The Swiss Residency Video Tour"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2F4F46]/80 via-[#2F4F46]/20 to-transparent"></div>

              {/* Play Button */}
              <motion.button
                onClick={() => setIsPlaying(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#C6A75E] flex items-center justify-center shadow-[0_8px_30px_rgba(198,167,94,0.4)] hover:bg-[#E6D2A3] transition-colors z-10"
              >
                <Play className="w-10 h-10 text-white ml-1" fill="white" />
              </motion.button>

              {/* Text Overlay */}
              <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                <h3 style={{ fontFamily: 'Playfair Display' }} className="text-2xl md:text-3xl font-semibold mb-2">
                  Discover Our Property
                </h3>
                <p className="text-sm md:text-base text-white/90">
                  A complete walkthrough of our rooms, facilities, and amenities
                </p>
              </div>
            </>
          )}

          {/* Video Player (Placeholder) */}
          {isPlaying && (
            <div className="w-full h-full bg-black flex items-center justify-center">
              <div className="text-center text-white p-8">
                <p className="mb-4">Video player would be embedded here</p>
                <p className="text-sm text-white/60">
                  In production, this would contain an embedded YouTube or Vimeo video
                </p>
                <motion.button
                  onClick={() => setIsPlaying(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-2 bg-[#C6A75E] rounded-full text-sm font-medium hover:bg-[#E6D2A3] transition-colors"
                >
                  Close Video
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}