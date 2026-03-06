import { motion } from 'motion/react';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BlogPreview() {
  const posts = [
    {
      id: 1,
      title: 'Top 10 Places to Visit in Greater Noida',
      excerpt: 'Discover the hidden gems and must-visit attractions in and around Greater Noida.',
      image: 'https://images.unsplash.com/photo-1609619385002-f40f2e3f1708?w=800&h=500&fit=crop',
      date: 'March 1, 2026',
      readTime: '5 min read',
      category: 'Travel Guide'
    },
    {
      id: 2,
      title: 'Business Travel Tips for Greater Noida',
      excerpt: 'Essential tips and tricks for business travelers visiting Greater Noida.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
      date: 'February 28, 2026',
      readTime: '4 min read',
      category: 'Business'
    },
    {
      id: 3,
      title: 'Experience Luxury at The Swiss Residency',
      excerpt: 'Behind the scenes of our commitment to providing world-class hospitality.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop',
      date: 'February 25, 2026',
      readTime: '6 min read',
      category: 'Hotel News'
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[#2F4F46] text-xs tracking-[0.3em] mb-6">LATEST UPDATES</div>
          <h2 style={{ fontFamily: 'Playfair Display' }} className="text-4xl md:text-5xl text-[#2F4F46] mb-6 font-semibold">
            News & Articles
          </h2>
          <div className="w-10 h-px bg-[#C6A75E] mx-auto mb-6"></div>
          <p className="text-[#8A8A8A] text-base max-w-2xl mx-auto">
            Stay informed with our latest news, travel tips, and local insights
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {posts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-[#C6A75E] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#2F4F46] mb-3 group-hover:text-[#C6A75E] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-[#8A8A8A] text-sm mb-4 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-[#8A8A8A] mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Read More */}
                <button className="flex items-center gap-2 text-[#2F4F46] hover:text-[#C6A75E] text-sm font-medium transition-colors group-hover:gap-3">
                  Read More
                  <ArrowRight className="w-4 h-4 transition-all" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#2F4F46] text-[#2F4F46] hover:bg-[#2F4F46] hover:text-white transition-all rounded-full text-sm tracking-wide font-medium">
            VIEW ALL ARTICLES
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
