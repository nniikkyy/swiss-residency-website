import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Bed, Users, Maximize, Wifi, Wind, Coffee, Star, ChevronLeft, ChevronRight, Heart, Sparkles, Award, Check, ArrowRight, Calendar, Shield, Zap } from 'lucide-react';

export function Rooms() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'details'>('overview');
  
  const room = {
    id: 'deluxe',
    name: 'Deluxe Room',
    tagline: 'Where Luxury Meets Comfort',
    price: '₹3,500',
    originalPrice: '₹4,500',
    discount: '22% OFF',
    description: 'Experience the perfect blend of sophistication and comfort in our elegantly designed Deluxe Rooms. Each room features modern amenities, premium furnishings, and thoughtful touches that make your stay truly memorable.',
    images: [
      'https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop'
    ],
    size: '350 sq ft',
    guests: '2 Guests',
    bed: 'King Size Bed',
    rating: 4.8,
    reviews: 127,
    availability: 'Only 3 rooms left',
    amenities: [
      { icon: Wifi, label: 'High-Speed WiFi', description: 'Complimentary high-speed internet' },
      { icon: Wind, label: 'Climate Control', description: 'Individual AC temperature control' },
      { icon: Coffee, label: 'Premium Breakfast', description: 'Continental breakfast included' },
      { icon: Shield, label: '24/7 Security', description: 'Round-the-clock protection' },
      { icon: Zap, label: 'Power Backup', description: 'Uninterrupted power supply' },
      { icon: Calendar, label: 'Flexible Booking', description: 'Easy cancellation policy' }
    ],
    features: [
      'Premium Egyptian Cotton Bedding',
      'Rain Shower with Premium Toiletries',
      'Mini Bar & Coffee Maker',
      'Smart TV with Streaming Services',
      'Work Desk with Ergonomic Chair',
      'Blackout Curtains',
      'In-Room Safe',
      'Iron & Ironing Board',
      'Daily Housekeeping',
      'Complimentary Bottled Water'
    ],
    highlights: [
      { label: 'Check-in', value: '2:00 PM' },
      { label: 'Check-out', value: '12:00 PM' },
      { label: 'View', value: 'City/Garden' },
      { label: 'Floor', value: '2nd - 4th' }
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => prev === 0 ? room.images.length - 1 : prev - 1);
  };

  return (
    <section id="rooms" className="py-20 px-4 lg:px-8 bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5F1E8] via-white to-[#E8DCC4] opacity-50"></div>
      <motion.div 
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#C6A75E]/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#1B4332]/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 text-[#1B4332] text-xs tracking-[0.3em] mb-6 bg-white/80 backdrop-blur-md px-8 py-3 rounded-full border-2 border-[#C6A75E]/30 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-[#C6A75E]" />
            LUXURY ACCOMMODATIONS
            <Sparkles className="w-4 h-4 text-[#C6A75E]" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl text-[#1B4332] mb-4 tracking-tight font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our Deluxe Rooms
          </motion.h1>
          
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-transparent via-[#C6A75E] to-transparent mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 128, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-lg font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {room.tagline}
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 h-[600px] group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full relative"
                >
                  <ImageWithFallback
                    src={room.images[currentImageIndex]}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <motion.button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-[#1B4332] shadow-xl opacity-0 group-hover:opacity-100 transition-all z-20"
                whileHover={{ scale: 1.1, x: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              
              <motion.button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-[#1B4332] shadow-xl opacity-0 group-hover:opacity-100 transition-all z-20"
                whileHover={{ scale: 1.1, x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>

              {/* Badges */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                <motion.div 
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider shadow-2xl flex items-center gap-2"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Award className="w-4 h-4" />
                  MOST POPULAR
                </motion.div>
                
                <motion.div 
                  className="bg-red-500 text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-wider shadow-2xl"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {room.discount}
                </motion.div>
              </div>

              {/* Image Indicators */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {room.images.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentImageIndex 
                        ? 'w-12 bg-white shadow-lg' 
                        : 'w-1.5 bg-white/50 hover:bg-white/75'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>

              {/* Price Tag */}
              <motion.div 
                className="absolute bottom-8 right-8 bg-[#1B4332] text-white px-8 py-4 rounded-2xl shadow-2xl z-10 backdrop-blur-md"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <div className="text-xs text-gray-300 tracking-widest mb-1">FROM</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-light">{room.price}</span>
                  <span className="text-base text-gray-400 line-through">{room.originalPrice}</span>
                </div>
                <div className="text-xs text-gray-300 tracking-widest mt-1">PER NIGHT</div>
              </motion.div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {room.images.map((img, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`relative rounded-2xl overflow-hidden h-28 ${
                    i === currentImageIndex ? 'ring-4 ring-[#C6A75E] shadow-xl' : 'opacity-70 hover:opacity-100'
                  } transition-all`}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: i === currentImageIndex ? 1 : 0.7, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${room.name} - View ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right: Room Details */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col"
          >
            {/* Title & Actions */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <motion.h2 
                  className="text-4xl text-[#1B4332] font-light tracking-wide mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {room.name}
                </motion.h2>
                
                {/* Rating */}
                <motion.div 
                  className="flex items-center gap-4 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < Math.floor(room.rating) 
                            ? 'fill-[#C6A75E] text-[#C6A75E]' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium text-[#1B4332]">{room.rating}</span>
                  <span className="text-gray-500">({room.reviews} reviews)</span>
                </motion.div>

                {/* Availability */}
                <motion.div 
                  className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div 
                    className="w-2.5 h-2.5 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {room.availability}
                </motion.div>
              </div>

              <motion.button
                onClick={() => setLiked(!liked)}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, type: "spring" }}
              >
                <Heart 
                  className={`w-7 h-7 transition-all ${
                    liked 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-400'
                  }`}
                />
              </motion.button>
            </div>

            {/* Quick Info */}
            <motion.div 
              className="grid grid-cols-3 gap-4 mb-8 p-6 bg-gradient-to-br from-[#F5F1E8] to-[#E8DCC4] rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              {[
                { icon: Maximize, label: room.size, sublabel: 'Room Size' },
                { icon: Users, label: room.guests, sublabel: 'Max Guests' },
                { icon: Bed, label: room.bed, sublabel: 'Bed Type' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <item.icon className="w-6 h-6 text-[#1B4332]" />
                  </div>
                  <div className="text-sm font-medium text-[#1B4332]">{item.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.sublabel}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-gray-600 leading-relaxed mb-8 text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              {room.description}
            </motion.p>

            {/* Tabs */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex gap-2 bg-white p-2 rounded-2xl shadow-lg">
                {[
                  { id: 'overview' as const, label: 'Overview' },
                  { id: 'amenities' as const, label: 'Amenities' },
                  { id: 'details' as const, label: 'Details' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium tracking-wide transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#1B4332] text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex-1 bg-white rounded-2xl p-6 shadow-lg mb-8"
              >
                {activeTab === 'overview' && (
                  <div className="grid grid-cols-2 gap-4">
                    {room.highlights.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 bg-[#F5F1E8] rounded-xl"
                      >
                        <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                        <div className="text-lg font-medium text-[#1B4332]">{item.value}</div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'amenities' && (
                  <div className="grid grid-cols-2 gap-4">
                    {room.amenities.map((amenity, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F5F1E8] transition-colors"
                      >
                        <div className="w-10 h-10 bg-[#1B4332] rounded-lg flex items-center justify-center flex-shrink-0">
                          <amenity.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-[#1B4332] mb-1">{amenity.label}</div>
                          <div className="text-xs text-gray-500">{amenity.description}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="space-y-3">
                    {room.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <motion.button
                onClick={() => navigate('/book')}
                className="flex-1 bg-[#1B4332] text-white py-5 px-8 rounded-2xl tracking-[0.15em] text-sm font-semibold relative overflow-hidden group shadow-xl"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#2D5940] to-[#1B4332]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  BOOK NOW
                  <ArrowRight className="w-5 h-5" />
                </span>
              </motion.button>
              
              <motion.button
                onClick={() => navigate(`/rooms/${room.id}`)}
                className="px-8 py-5 border-2 border-[#1B4332] text-[#1B4332] rounded-2xl tracking-[0.15em] text-sm font-semibold hover:bg-[#1B4332] hover:text-white transition-all shadow-lg"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                VIEW DETAILS
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Info Banner */}
        <motion.div 
          className="bg-gradient-to-r from-[#1B4332] to-[#2D5940] rounded-3xl p-12 text-white text-center shadow-2xl"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.h3 
            className="text-3xl font-light mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            Need Help Choosing Your Perfect Room?
          </motion.h3>
          <motion.p 
            className="text-gray-200 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
          >
            Our team is ready to assist you with room selection, special requests, and booking arrangements
          </motion.p>
          <motion.button
            onClick={() => navigate('/contact')}
            className="px-10 py-4 bg-white text-[#1B4332] rounded-2xl tracking-[0.15em] text-sm font-semibold hover:bg-gray-50 transition-all shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
          >
            CONTACT US NOW
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}