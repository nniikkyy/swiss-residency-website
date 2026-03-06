import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar, Users, Check, Minus, Plus, ArrowLeft } from 'lucide-react';
import { format, addDays, isSameDay, isAfter, isBefore, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import { checkAvailability, createBooking } from '../../lib/bookingService';
import type { RoomType } from '../../lib/types';
import { BackButton } from '../components/BackButton';

const ROOM_TYPES: RoomType[] = [
  {
    id: 'standard',
    name: 'Standard Room',
    description: 'Comfortable accommodation with modern amenities',
    pricePerNight: 2500,
    images: [],
    amenities: ['WiFi', 'AC', 'TV', 'Mini Bar'],
  },
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    description: 'Spacious room with premium furnishings',
    pricePerNight: 3500,
    images: [],
    amenities: ['WiFi', 'AC', 'Smart TV', 'Mini Bar', 'Balcony'],
  },
  {
    id: 'suite',
    name: 'Suite',
    description: 'Luxurious suite with separate living area',
    pricePerNight: 5000,
    images: [],
    amenities: ['WiFi', 'AC', 'Smart TV', 'Mini Bar', 'Balcony', 'Jacuzzi'],
  },
];

export function LuxuryBookingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [selectingCheckIn, setSelectingCheckIn] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalGuests = adults + children;
  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const subtotal = selectedRoomType ? selectedRoomType.pricePerNight * nights : 0;
  const gst = Math.round(subtotal * 0.12);
  const totalPrice = subtotal + gst;

  const progress = (currentStep / 4) * 100;

  const handleDateClick = (date: Date) => {
    if (selectingCheckIn) {
      setCheckIn(date);
      setCheckOut(null);
      setSelectingCheckIn(false);
    } else {
      if (checkIn && isAfter(date, checkIn)) {
        setCheckOut(date);
      }
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!selectedRoomType || !checkIn || !checkOut || !guestName || !guestPhone) return;

    setIsSubmitting(true);
    try {
      const userId = localStorage.getItem('userId') || 'guest';
      
      const result = await createBooking({
        userId,
        roomTypeId: selectedRoomType.id,
        roomTypeName: selectedRoomType.name,
        checkIn: format(checkIn, 'yyyy-MM-dd'),
        checkOut: format(checkOut, 'yyyy-MM-dd'),
        guests: totalGuests,
        nights,
        subtotal,
        gst,
        totalAmount: totalPrice,
        status: 'confirmed',
        paymentStatus: 'paid',
        guestName,
        guestPhone,
        specialRequests
      });

      setCurrentStep(4);
      setTimeout(() => {
        navigate(`/booking-confirmation/${result.bookingId}`);
      }, 2000);
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
            className="p-2 hover:bg-[#F0F0F0] rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#2F4F46]" />
          </button>
          <h3 style={{ fontFamily: 'Playfair Display' }} className="text-xl text-[#2F4F46]">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button
            onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
            className="p-2 hover:bg-[#F0F0F0] rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-[#2F4F46]" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs text-gray-500 font-medium pb-2">
              {day}
            </div>
          ))}
          {days.map((day, idx) => {
            const isCheckInDate = checkIn && isSameDay(day, checkIn);
            const isCheckOutDate = checkOut && isSameDay(day, checkOut);
            const isInRange = checkIn && checkOut && isAfter(day, checkIn) && isBefore(day, checkOut);
            const isPast = isBefore(day, new Date()) && !isSameDay(day, new Date());
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();

            return (
              <button
                key={idx}
                onClick={() => !isPast && handleDateClick(day)}
                disabled={isPast}
                className={`
                  aspect-square flex items-center justify-center text-sm rounded-lg transition-all
                  ${isCheckInDate || isCheckOutDate ? 'bg-[#2F4F46] text-white' : ''}
                  ${isInRange ? 'bg-[#E8ECEA]' : ''}
                  ${!isCheckInDate && !isCheckOutDate && !isInRange && isCurrentMonth && !isPast ? 'hover:bg-[#F0F0F0]' : ''}
                  ${isPast ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                  ${!isCurrentMonth ? 'opacity-40' : ''}
                `}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>

        {checkIn && (
          <div className="mt-6 text-center text-sm text-gray-600">
            {checkOut ? (
              <span>{nights} night{nights !== 1 ? 's' : ''} selected</span>
            ) : (
              <span>Select check-out date</span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] relative overflow-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#EAEAEA] z-50">
        <motion.div
          className="h-full bg-[#C6A75E]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Back to Home Button - Always visible on Step 1 */}
      {currentStep === 1 && (
        <button
          onClick={() => navigate('/')}
          className="fixed top-6 left-6 z-40 flex items-center gap-2 px-4 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all group"
        >
          <ArrowLeft className="w-5 h-5 text-[#2F4F46] group-hover:text-[#1B4332]" />
          <span className="text-sm tracking-wider text-[#2F4F46] group-hover:text-[#1B4332]">BACK</span>
        </button>
      )}

      {/* Back Button - For Steps 2 and 3 */}
      {currentStep > 1 && currentStep < 4 && (
        <BackButton onClick={handleBack} />
      )}

      <AnimatePresence mode="wait">
        {/* Step 1: Select Room & Dates */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-md mx-auto px-6 pt-20 pb-32"
          >
            <div className="mb-8">
              <p className="text-xs tracking-wider text-[#9A9A9A] mb-2">STEP 1 OF 4</p>
              <h1 style={{ fontFamily: 'Playfair Display' }} className="text-3xl font-semibold text-[#2F4F46] mb-2">
                Select Your Stay
              </h1>
              <p className="text-sm text-gray-600">Choose your room and dates</p>
            </div>

            {/* Room Type Selection */}
            <div className="space-y-4 mb-8">
              {ROOM_TYPES.map((room) => (
                <motion.button
                  key={room.id}
                  onClick={() => setSelectedRoomType(room)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full p-6 rounded-2xl text-left transition-all
                    ${selectedRoomType?.id === room.id 
                      ? 'bg-[#2F4F46] text-white shadow-lg' 
                      : 'bg-white text-[#2F4F46] shadow-md hover:shadow-lg'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 style={{ fontFamily: 'Playfair Display' }} className="text-xl font-semibold">
                      {room.name}
                    </h3>
                    <div className={`text-lg font-light ${selectedRoomType?.id === room.id ? 'text-[#C6A75E]' : 'text-[#2F4F46]'}`}>
                      ₹{room.pricePerNight}
                    </div>
                  </div>
                  <p className={`text-sm ${selectedRoomType?.id === room.id ? 'text-white/80' : 'text-gray-600'}`}>
                    {room.description}
                  </p>
                </motion.button>
              ))}
            </div>

            {/* Calendar */}
            {selectedRoomType && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                {renderCalendar()}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step 2: Select Guests */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-md mx-auto px-6 pt-20 pb-32"
          >
            <div className="mb-8">
              <p className="text-xs tracking-wider text-[#9A9A9A] mb-2">STEP 2 OF 4</p>
              <h1 style={{ fontFamily: 'Playfair Display' }} className="text-3xl font-semibold text-[#2F4F46] mb-2">
                Select Guests
              </h1>
              <p className="text-sm text-gray-600">How many guests are joining?</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-[#2F4F46]">Adults</p>
                  <p className="text-sm text-gray-500">Age 13+</p>
                </div>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-9 h-9 rounded-full bg-[#F0F0F0] flex items-center justify-center hover:bg-[#2F4F46] hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <span className="text-lg font-medium text-[#2F4F46] w-8 text-center">{adults}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAdults(adults + 1)}
                    className="w-9 h-9 rounded-full bg-[#F0F0F0] flex items-center justify-center hover:bg-[#2F4F46] hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="h-px bg-gray-200" />

              {/* Children */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-[#2F4F46]">Children</p>
                  <p className="text-sm text-gray-500">Age 0-12</p>
                </div>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-9 h-9 rounded-full bg-[#F0F0F0] flex items-center justify-center hover:bg-[#2F4F46] hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <span className="text-lg font-medium text-[#2F4F46] w-8 text-center">{children}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setChildren(children + 1)}
                    className="w-9 h-9 rounded-full bg-[#F0F0F0] flex items-center justify-center hover:bg-[#2F4F46] hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Guest Details */}
            <div className="mt-6 bg-white rounded-2xl p-8 shadow-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2F4F46] mb-2">Guest Name</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F4F46] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2F4F46] mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F4F46] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2F4F46] mb-2">Special Requests (Optional)</label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any special requirements?"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F4F46] focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-md mx-auto px-6 pt-20 pb-32"
          >
            <div className="mb-8">
              <p className="text-xs tracking-wider text-[#9A9A9A] mb-2">STEP 3 OF 4</p>
              <h1 style={{ fontFamily: 'Playfair Display' }} className="text-3xl font-semibold text-[#2F4F46] mb-2">
                Review & Confirm
              </h1>
              <p className="text-sm text-gray-600">Please review your booking details</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              {/* Room Type */}
              <div>
                <p className="text-xs text-gray-500 tracking-wider mb-1">ROOM TYPE</p>
                <p style={{ fontFamily: 'Playfair Display' }} className="text-xl text-[#2F4F46]">
                  {selectedRoomType?.name}
                </p>
              </div>

              <div className="h-px bg-[#C6A75E] opacity-40" />

              {/* Dates */}
              <div>
                <p className="text-xs text-gray-500 tracking-wider mb-2">DATES</p>
                <div className="flex items-center gap-3 text-[#2F4F46]">
                  <Calendar className="w-4 h-4 text-[#C6A75E]" />
                  <span>{checkIn && format(checkIn, 'MMM dd, yyyy')}</span>
                  <span>→</span>
                  <span>{checkOut && format(checkOut, 'MMM dd, yyyy')}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{nights} night{nights !== 1 ? 's' : ''}</p>
              </div>

              <div className="h-px bg-[#C6A75E] opacity-40" />

              {/* Guests */}
              <div>
                <p className="text-xs text-gray-500 tracking-wider mb-2">GUESTS</p>
                <div className="flex items-center gap-2 text-[#2F4F46]">
                  <Users className="w-4 h-4 text-[#C6A75E]" />
                  <span>{totalGuests} Guest{totalGuests !== 1 ? 's' : ''}</span>
                  <span className="text-sm text-gray-500">({adults} adult{adults !== 1 ? 's' : ''}, {children} child{children !== 1 ? 'ren' : ''})</span>
                </div>
              </div>

              <div className="h-px bg-[#C6A75E] opacity-40" />

              {/* Guest Info */}
              <div>
                <p className="text-xs text-gray-500 tracking-wider mb-2">GUEST DETAILS</p>
                <p className="text-[#2F4F46]">{guestName}</p>
                <p className="text-sm text-gray-500">{guestPhone}</p>
              </div>

              {specialRequests && (
                <>
                  <div className="h-px bg-[#C6A75E] opacity-40" />
                  <div>
                    <p className="text-xs text-gray-500 tracking-wider mb-2">SPECIAL REQUESTS</p>
                    <p className="text-sm text-[#2F4F46]">{specialRequests}</p>
                  </div>
                </>
              )}

              <div className="h-px bg-gray-200" />

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Room charges ({nights} nights)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>GST (12%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>
                <div className="h-px bg-[#C6A75E] opacity-40 my-3" />
                <div className="flex justify-between items-center">
                  <span className="text-lg tracking-wide text-[#2F4F46]">TOTAL</span>
                  <span style={{ fontFamily: 'Playfair Display' }} className="text-3xl text-[#2F4F46]">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="max-w-md mx-auto px-6 min-h-screen flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#2F4F46] flex items-center justify-center"
              >
                <Check className="w-12 h-12 text-white" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ fontFamily: 'Playfair Display' }}
                className="text-4xl font-semibold text-[#2F4F46] mb-4"
              >
                Your stay is confirmed
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-[#8A8A8A]"
              >
                We look forward to welcoming you
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <div className="inline-flex gap-2">
                  <div className="w-2 h-2 bg-[#C6A75E] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#C6A75E] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-[#C6A75E] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom CTA */}
      {currentStep < 4 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        >
          <div className="max-w-md mx-auto">
            <motion.button
              onClick={currentStep === 3 ? handleSubmit : handleNext}
              disabled={
                (currentStep === 1 && (!selectedRoomType || !checkIn || !checkOut)) ||
                (currentStep === 2 && (!guestName || !guestPhone)) ||
                isSubmitting
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#2F4F46] text-white py-4 rounded-xl tracking-wider text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {currentStep === 3 ? (isSubmitting ? 'CONFIRMING...' : 'CONFIRM BOOKING') : 'CONTINUE'}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}