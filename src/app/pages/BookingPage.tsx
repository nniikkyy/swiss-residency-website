import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Users, Hotel, IndianRupee, ArrowRight, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { format } from 'date-fns';
import { 
  checkRoomAvailability, 
  createBooking, 
  calculateNights, 
  calculateBookingPrice, 
  getRoomTypes 
} from '../../lib/bookingService';
import type { RoomType, AvailabilityCheck } from '../../lib/types';
import { BackButton } from '../components/BackButton';

export function BookingPage() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [roomTypeId, setRoomTypeId] = useState('standard');
  const [totalPrice, setTotalPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [nights, setNights] = useState(0);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null);
  const [availability, setAvailability] = useState<AvailabilityCheck | null>(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Load room types on mount
  useEffect(() => {
    loadRoomTypes();
  }, []);

  const loadRoomTypes = async () => {
    try {
      const types = await getRoomTypes();
      setRoomTypes(types);
      setSelectedRoomType(types[0]);
      setRoomTypeId(types[0].id);
    } catch (error) {
      console.error('Error loading room types:', error);
      setError('Failed to load room types');
    }
  };

  // Update selected room type when room type ID changes
  useEffect(() => {
    const roomType = roomTypes.find(r => r.id === roomTypeId);
    if (roomType) {
      setSelectedRoomType(roomType);
    }
  }, [roomTypeId, roomTypes]);

  // Check availability when dates change
  useEffect(() => {
    if (checkIn && checkOut && selectedRoomType) {
      checkAvailabilityHandler();
    }
  }, [checkIn, checkOut, selectedRoomType]);

  // Calculate price when dates or room changes
  useEffect(() => {
    if (checkIn && checkOut && selectedRoomType) {
      const nightCount = calculateNights(checkIn, checkOut);
      if (nightCount > 0) {
        setNights(nightCount);
        const pricing = calculateBookingPrice(selectedRoomType.price, nightCount);
        setSubtotal(pricing.subtotal);
        setGst(pricing.gst);
        setTotalPrice(pricing.total);
      }
    }
  }, [checkIn, checkOut, selectedRoomType]);

  const checkAvailabilityHandler = async () => {
    if (!selectedRoomType) return;
    
    setIsCheckingAvailability(true);
    setError('');
    
    try {
      const result = await checkRoomAvailability(roomTypeId, checkIn, checkOut);
      setAvailability(result);
    } catch (error) {
      console.error('Error checking availability:', error);
      setError('Failed to check availability');
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkIn || !checkOut || nights <= 0 || !availability?.isAvailable) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const userId = localStorage.getItem('userId') || 'demo-user';
      
      const result = await createBooking({
        userId,
        roomTypeId,
        roomTypeName: selectedRoomType?.name || '',
        checkIn,
        checkOut,
        guests,
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

      // Navigate to confirmation page with assigned room
      navigate(`/booking-confirmation/${result.bookingId}`);
    } catch (error: any) {
      console.error('Error creating booking:', error);
      setError(error.message || 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-20">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <BackButton />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <a 
            href="/" 
            className="text-xl tracking-[0.2em] text-[#1B4332] hover:text-[#2D5940] transition-colors inline-block mb-8"
          >
            THE SWISS RESIDENCY
          </a>
          <h1 className="text-4xl text-[#1B4332] mb-4 tracking-wide font-light">
            Book Your Stay
          </h1>
          <div className="w-24 h-px bg-[#1B4332] mx-auto"></div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-700 font-light">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-12 shadow-lg space-y-8">
          {/* Check-in and Check-out */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-[#1B4332] mb-3 tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                CHECK-IN DATE
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={today}
                required
                className="w-full px-4 py-3 border border-gray-200 focus:border-[#1B4332] focus:outline-none transition-colors text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm text-[#1B4332] mb-3 tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                CHECK-OUT DATE
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || today}
                required
                className="w-full px-4 py-3 border border-gray-200 focus:border-[#1B4332] focus:outline-none transition-colors text-gray-700"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm text-[#1B4332] mb-3 tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4" />
              NUMBER OF GUESTS
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 focus:border-[#1B4332] focus:outline-none transition-colors text-gray-700"
            >
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-sm text-[#1B4332] mb-3 tracking-wider flex items-center gap-2">
              <Hotel className="w-4 h-4" />
              ROOM TYPE
            </label>
            
            {/* Availability Badge & Room Assignment */}
            {checkIn && checkOut && availability && (
              <div className="mb-6 space-y-3">
                {availability.isAvailable && availability.availableCount > 0 ? (
                  <>
                    <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-700 font-light">
                        Available – {availability.availableCount} {availability.availableCount === 1 ? 'Room' : 'Rooms'} Left
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-red-700 font-light">
                      Fully Booked for Selected Dates
                    </span>
                  </div>
                )}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roomTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setRoomTypeId(type.id)}
                  className={`p-6 border-2 transition-all text-left ${
                    roomTypeId === type.id
                      ? 'border-[#1B4332] bg-[#F5F1E8]'
                      : 'border-gray-200 hover:border-[#1B4332]/50'
                  }`}
                >
                  <h3 className="text-lg text-[#1B4332] mb-2 tracking-wide">
                    {type.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-light mb-3">
                    {type.size}
                  </p>
                  <p className="text-xl text-[#1B4332] font-light">
                    ₹{type.price.toLocaleString()} <span className="text-sm text-gray-500">/night</span>
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Guest Details */}
          <div className="space-y-4">
            <h3 className="text-sm text-[#1B4332] tracking-wider mb-4">
              GUEST DETAILS
            </h3>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2 font-light">
                Full Name
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 focus:border-[#1B4332] focus:outline-none transition-colors text-gray-700"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2 font-light">
                Phone Number
              </label>
              <input
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 focus:border-[#1B4332] focus:outline-none transition-colors text-gray-700"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2 font-light">
                Special Requests (Optional)
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 focus:border-[#1B4332] focus:outline-none transition-colors text-gray-700"
                placeholder="Any special requirements or preferences"
              />
            </div>
          </div>

          {/* Price Summary */}
          {nights > 0 && selectedRoomType && (
            <div className="bg-[#F5F1E8] p-6 space-y-3">
              <h3 className="text-sm text-[#1B4332] tracking-wider mb-4">
                PRICE BREAKDOWN
              </h3>
              <div className="flex justify-between text-gray-700 font-light">
                <span>
                  {selectedRoomType.name} × {nights} {nights === 1 ? 'night' : 'nights'}
                </span>
                <span>₹{(selectedRoomType.price * nights).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700 font-light">
                <span>GST (12%)</span>
                <span>₹{gst.toLocaleString()}</span>
              </div>
              <div className="h-px bg-gray-300 my-3"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg text-[#1B4332] tracking-wide">
                  TOTAL AMOUNT
                </span>
                <span className="text-2xl text-[#1B4332] font-light flex items-center gap-1">
                  <IndianRupee className="w-5 h-5" />
                  {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!checkIn || !checkOut || nights <= 0 || !availability?.isAvailable || isSubmitting}
            className="w-full bg-[#1B4332] text-white py-4 tracking-wider text-sm hover:bg-[#2D5940] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'PROCESSING...' : 'CONFIRM BOOKING'}
            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
          </button>

          <p className="text-center text-sm text-gray-500 font-light">
            Your room will be automatically assigned upon confirmation
          </p>
        </form>
      </div>
    </div>
  );
}