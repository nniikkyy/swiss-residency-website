import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { Wifi, Snowflake, Coffee, Tv, Wind, Sparkles, ChevronLeft, ArrowRight } from 'lucide-react';
import { unsplash_tool } from '../../tools/unsplash';
import { BackButton } from '../components/BackButton';

const ROOM_DETAILS = {
  standard: {
    name: 'Standard Room',
    price: 2500,
    description: 'Experience comfort and style in our well-appointed Standard Room, designed for travelers who appreciate quality and modern amenities.',
    longDescription: 'Our Standard Rooms offer a perfect blend of comfort and functionality. Each room features contemporary furnishings, premium bedding, and thoughtfully designed spaces that make you feel right at home.',
    amenities: [
      { icon: Wifi, label: 'High-Speed WiFi' },
      { icon: Snowflake, label: 'Air Conditioning' },
      { icon: Coffee, label: 'Breakfast Included' },
      { icon: Tv, label: 'Smart TV' },
    ],
    images: [
      'luxury hotel standard room',
      'modern hotel bedroom',
      'hotel room interior',
    ],
  },
  deluxe: {
    name: 'Deluxe Room',
    price: 3500,
    description: 'Indulge in luxury with our spacious Deluxe Room, featuring premium furnishings and an elegant ambiance perfect for a memorable stay.',
    longDescription: 'The Deluxe Room elevates your stay with additional space and premium amenities. Enjoy stunning views from your private balcony, luxurious bedding, and exclusive toiletries.',
    amenities: [
      { icon: Wifi, label: 'High-Speed WiFi' },
      { icon: Snowflake, label: 'Climate Control' },
      { icon: Coffee, label: 'Premium Breakfast' },
      { icon: Tv, label: 'Smart TV 55"' },
      { icon: Wind, label: 'Private Balcony' },
      { icon: Sparkles, label: 'Mini Bar' },
    ],
    images: [
      'luxury deluxe hotel room',
      'hotel balcony view',
      'luxury hotel bathroom',
    ],
  },
  suite: {
    name: 'Suite',
    price: 5000,
    description: 'Experience ultimate luxury in our exquisite Suite, featuring a separate living area, premium amenities, and unparalleled comfort.',
    longDescription: 'Our Suites redefine luxury accommodation with separate living and bedroom areas, a private jacuzzi, and personalized concierge services. Perfect for those seeking the finest hospitality experience.',
    amenities: [
      { icon: Wifi, label: 'Ultra-Fast WiFi' },
      { icon: Snowflake, label: 'Smart Climate Control' },
      { icon: Coffee, label: 'Gourmet Breakfast' },
      { icon: Tv, label: 'Smart TV 65"' },
      { icon: Wind, label: 'Premium Balcony' },
      { icon: Sparkles, label: 'Premium Mini Bar' },
    ],
    images: [
      'luxury hotel suite',
      'hotel suite living room',
      'luxury hotel jacuzzi',
    ],
  },
};

export function RoomDetailPage() {
  const { roomType = 'deluxe' } = useParams<{ roomType: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const room = ROOM_DETAILS[roomType as keyof typeof ROOM_DETAILS] || ROOM_DETAILS.deluxe;

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-20">
      {/* Hero Section with Gallery */}
      <div className="relative h-[60vh] overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        <img
          src={`https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=800&fit=crop`}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        
        {/* Back Button */}
        <BackButton onClick={() => navigate(-1)} />

        {/* Room Name Overlay */}
        <div className="absolute bottom-8 left-8 text-white z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'Playfair Display' }}
            className="text-4xl font-semibold mb-2"
          >
            {room.name}
          </motion.h1>
          <p className="text-white/90">{room.description}</p>
        </div>
      </div>

      {/* Gallery Thumbnails */}
      <div className="bg-white py-4 px-8 overflow-x-auto">
        <div className="flex gap-4 max-w-6xl mx-auto">
          {[1, 2, 3, 4].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx - 1)}
              className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                currentImageIndex === idx - 1 ? 'border-[#C6A75E]' : 'border-transparent'
              }`}
            >
              <img
                src={`https://images.unsplash.com/photo-${idx === 1 ? '1611892440504' : idx === 2 ? '1582719478250' : idx === 3 ? '1590490360182' : '1566665797739'}-42a792e24d32?w=200&h=150&fit=crop`}
                alt={`Gallery ${idx}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Floating Price Card */}
      <div className="max-w-6xl mx-auto px-8 -mt-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] p-6 flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-gray-500 mb-1">Starting from</p>
            <p style={{ fontFamily: 'Playfair Display' }} className="text-3xl text-[#2F4F46]">
              ₹{room.price.toLocaleString()}
              <span className="text-lg text-gray-500 font-light"> / night</span>
            </p>
          </div>
          <motion.button
            onClick={() => navigate('/luxury-book')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#2F4F46] text-white rounded-xl tracking-wider text-sm font-medium shadow-lg hover:bg-[#1e332b] transition-colors"
          >
            BOOK NOW
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 style={{ fontFamily: 'Playfair Display' }} className="text-2xl text-[#2F4F46] mb-4">
            About This Room
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            {room.longDescription}
          </p>
        </motion.div>

        {/* Gold Divider */}
        <div className="h-px bg-[#C6A75E] opacity-40 mb-12" />

        {/* Amenities Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 style={{ fontFamily: 'Playfair Display' }} className="text-2xl text-[#2F4F46] mb-8">
            Room Amenities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {room.amenities.map((amenity, idx) => {
              const Icon = amenity.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#F0F0F0] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#2F4F46]" />
                  </div>
                  <span className="text-gray-700">{amenity.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Gold Divider */}
        <div className="h-px bg-[#C6A75E] opacity-40 my-12" />

        {/* Policies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-8"
        >
          <h2 style={{ fontFamily: 'Playfair Display' }} className="text-2xl text-[#2F4F46] mb-6">
            Important Information
          </h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-[#C6A75E] rounded-full mt-2" />
              <p>Check-in: 2:00 PM | Check-out: 11:00 AM</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-[#C6A75E] rounded-full mt-2" />
              <p>Early check-in and late check-out subject to availability</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-[#C6A75E] rounded-full mt-2" />
              <p>Valid ID proof required at check-in</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-[#C6A75E] rounded-full mt-2" />
              <p>Free cancellation up to 24 hours before check-in</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Starting from</p>
            <p style={{ fontFamily: 'Playfair Display' }} className="text-2xl text-[#2F4F46]">
              ₹{room.price.toLocaleString()}<span className="text-sm text-gray-500 font-light"> / night</span>
            </p>
          </div>
          <motion.button
            onClick={() => navigate('/luxury-book')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#2F4F46] text-white rounded-xl tracking-wider text-sm font-medium flex items-center gap-2 shadow-lg hover:bg-[#1e332b] transition-colors"
          >
            BOOK THIS ROOM
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}