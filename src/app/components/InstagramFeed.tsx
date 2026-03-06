import { motion } from 'motion/react';
import { Instagram, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function InstagramFeed() {
  // Mock Instagram posts - in production, use Instagram Graph API
  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop',
      caption: 'Luxury meets comfort',
      link: '#'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=400&fit=crop',
      caption: 'Your perfect getaway',
      link: '#'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop',
      caption: 'Experience elegance',
      link: '#'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=400&fit=crop',
      caption: 'Premium hospitality',
      link: '#'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400&h=400&fit=crop',
      caption: 'Relax in style',
      link: '#'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=400&fit=crop',
      caption: 'Modern luxury',
      link: '#'
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-[#F7F6F2]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Instagram className="w-6 h-6 text-[#E4405F]" />
            <div className="text-[#2F4F46] text-xs tracking-[0.3em]">FOLLOW US</div>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display' }} className="text-4xl md:text-5xl text-[#2F4F46] mb-4 font-semibold">
            Guest Experiences
          </h2>
          <div className="w-10 h-px bg-[#C6A75E] mx-auto mb-4"></div>
          <p className="text-[#8A8A8A] text-base max-w-2xl mx-auto">
            Share your moments with <span className="font-medium text-[#2F4F46]">#TheSwissResidency</span>
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {posts.map((post, idx) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer shadow-md"
            >
              <ImageWithFallback
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                <div className="flex items-center gap-2 text-white text-sm">
                  <Instagram className="w-4 h-4" />
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://instagram.com/theswissresidency"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#2F4F46] text-[#2F4F46] hover:bg-[#2F4F46] hover:text-white transition-all rounded-full text-sm tracking-wide font-medium"
          >
            <Instagram className="w-5 h-5" />
            FOLLOW @THESWISSRESIDENCY
          </a>
        </motion.div>
      </div>
    </section>
  );
}
