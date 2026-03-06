import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Calendar, User, IndianRupee, FileText, Hotel } from 'lucide-react';
import type { Booking } from '../../lib/types';
import { BackButton } from '../components/BackButton';

export function LuxuryMyBookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    try {
      const saved = localStorage.getItem('bookings');
      const allBookings = saved ? JSON.parse(saved) : [];
      const userId = localStorage.getItem('userId') || 'guest';
      const userBookings = allBookings.filter((b: Booking) => b.userId === userId);
      setBookings(userBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const toggleExpand = (bookingId: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(bookingId)) {
        next.delete(bookingId);
      } else {
        next.add(bookingId);
      }
      return next;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return { bg: '#E8F3EE', text: '#2F4F46', border: '#2F4F46' };
      case 'cancelled':
        return { bg: '#FCE8E8', text: '#A33A3A', border: '#A33A3A' };
      case 'completed':
        return { bg: '#EAEAEA', text: '#555555', border: '#555555' };
      default:
        return { bg: '#F0F0F0', text: '#666666', border: '#666666' };
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <div className="mb-8">
          <BackButton />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 style={{ fontFamily: 'Playfair Display' }} className="text-4xl font-semibold text-[#2F4F46] mb-2">
            My Bookings
          </h1>
          <p className="text-gray-600">View and manage your reservations</p>
        </motion.div>

        {/* Bookings List */}
        <div className="space-y-6">
          {bookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-12 text-center"
            >
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-6">No bookings yet</p>
              <motion.button
                onClick={() => navigate('/luxury-book')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-[#2F4F46] text-white rounded-xl tracking-wider text-sm font-medium"
              >
                MAKE YOUR FIRST BOOKING
              </motion.button>
            </motion.div>
          ) : (
            bookings.map((booking, idx) => {
              const isExpanded = expandedIds.has(booking.bookingId);
              const statusColors = getStatusColor(booking.status);

              return (
                <motion.div
                  key={booking.bookingId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xs text-gray-500 tracking-wider mb-1">BOOKING ID</p>
                        <p className="text-lg font-medium text-[#2F4F46]">{booking.bookingId}</p>
                      </div>
                      <div
                        style={{
                          backgroundColor: statusColors.bg,
                          color: statusColors.text,
                          borderColor: statusColors.border,
                        }}
                        className="px-4 py-1.5 rounded-full text-xs tracking-wider font-medium border"
                      >
                        {booking.status.toUpperCase()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 style={{ fontFamily: 'Playfair Display' }} className="text-2xl text-[#2F4F46] mb-2">
                          {booking.roomTypeName}
                        </h3>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#C6A75E]" />
                            <span>{booking.checkIn} → {booking.checkOut}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-[#C6A75E]" />
                            <span>{booking.guests} Guest{booking.guests !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        onClick={() => toggleExpand(booking.bookingId)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="ml-4 p-2 rounded-full bg-[#F0F0F0] hover:bg-[#2F4F46] hover:text-white transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-100 p-6 bg-[#F7F6F2] space-y-4">
                          {/* Room Number */}
                          {booking.roomId && (
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                              <div className="w-10 h-10 rounded-full bg-[#2F4F46] flex items-center justify-center">
                                <Hotel className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">ASSIGNED ROOM</p>
                                <p className="text-lg font-medium text-[#2F4F46]">Room {booking.roomId}</p>
                                <p className="text-xs text-gray-500">Floor {booking.roomId?.charAt(0)}</p>
                              </div>
                            </div>
                          )}

                          {/* Guest Details */}
                          <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                            <User className="w-5 h-5 text-[#C6A75E]" />
                            <div>
                              <p className="text-xs text-gray-500">GUEST NAME</p>
                              <p className="text-[#2F4F46]">{booking.guestName}</p>
                              <p className="text-sm text-gray-500">{booking.guestPhone}</p>
                            </div>
                          </div>

                          {/* Pricing */}
                          <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                            <IndianRupee className="w-5 h-5 text-[#C6A75E]" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500">TOTAL AMOUNT</p>
                              <p style={{ fontFamily: 'Playfair Display' }} className="text-2xl text-[#2F4F46]">
                                ₹{booking.totalAmount.toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-500">{booking.nights} night{booking.nights !== 1 ? 's' : ''} + GST</p>
                            </div>
                          </div>

                          {/* Special Requests */}
                          {booking.specialRequests && (
                            <div className="p-4 bg-white rounded-xl">
                              <p className="text-xs text-gray-500 mb-2">SPECIAL REQUESTS</p>
                              <p className="text-sm text-[#2F4F46]">{booking.specialRequests}</p>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex gap-3 pt-2">
                            <motion.button
                              onClick={() => navigate(`/invoice/${booking.bookingId}`)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#C6A75E] text-[#C6A75E] rounded-xl tracking-wider text-sm font-medium hover:bg-[#C6A75E] hover:text-white transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              VIEW INVOICE
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}