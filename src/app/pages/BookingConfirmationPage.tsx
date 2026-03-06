import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CheckCircle, Calendar, Hotel, User, Phone, IndianRupee, Download, ArrowRight } from 'lucide-react';
import type { Booking } from '../../lib/types';
import { BackButton } from '../components/BackButton';

export function BookingConfirmationPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (bookingId) {
      loadBooking(bookingId);
    }
  }, [bookingId]);

  const loadBooking = async (id: string) => {
    try {
      // Load from localStorage (in production, query Firestore)
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const found = bookings.find((b: Booking) => b.bookingId === id);
      if (found) {
        setBooking(found);
      }
    } catch (error) {
      console.error('Error loading booking:', error);
    }
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="text-center">
          <Hotel className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-light">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-8">
        {/* Back Button */}
        <div className="mb-8">
          <BackButton />
        </div>

        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl text-[#1B4332] mb-4 tracking-wide font-light">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Your stay at The Swiss Residency is confirmed
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white shadow-lg mb-8">
          {/* Booking ID Header */}
          <div className="bg-[#1B4332] text-white p-6 text-center">
            <p className="text-sm tracking-widest mb-2 opacity-80">BOOKING ID</p>
            <p className="text-3xl font-light tracking-wide">{booking.bookingId}</p>
          </div>

          {/* Room Assignment - HIGHLIGHTED */}
          <div className="bg-[#E8DCC4] border-t-4 border-[#1B4332] p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Hotel className="w-6 h-6 text-[#1B4332]" />
              <p className="text-sm text-[#1B4332] tracking-widest">
                YOUR ASSIGNED ROOM
              </p>
            </div>
            <p className="text-5xl text-[#1B4332] font-light mb-2">
              Room {booking.roomId}
            </p>
            <p className="text-lg text-gray-600 font-light">
              {booking.roomTypeName}
            </p>
            <p className="text-sm text-gray-500 font-light mt-2">
              Floor {booking.roomId?.charAt(0)}
            </p>
          </div>

          {/* Booking Information */}
          <div className="p-8 space-y-6">
            {/* Guest Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-[#1B4332] mt-1" />
                <div>
                  <p className="text-xs text-gray-500 tracking-wider mb-1">GUEST NAME</p>
                  <p className="text-[#1B4332] font-light">{booking.guestName}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#1B4332] mt-1" />
                <div>
                  <p className="text-xs text-gray-500 tracking-wider mb-1">CONTACT NUMBER</p>
                  <p className="text-[#1B4332] font-light">{booking.guestPhone}</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* Stay Details */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-[#1B4332]" />
                <p className="text-xs text-gray-500 tracking-wider">STAY DETAILS</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">CHECK-IN</p>
                  <p className="text-[#1B4332] font-light">{booking.checkIn}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">CHECK-OUT</p>
                  <p className="text-[#1B4332] font-light">{booking.checkOut}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">DURATION</p>
                  <p className="text-[#1B4332] font-light">
                    {booking.nights} {booking.nights === 1 ? 'Night' : 'Nights'}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* Pricing */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee className="w-5 h-5 text-[#1B4332]" />
                <p className="text-xs text-gray-500 tracking-wider">PAYMENT SUMMARY</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700 font-light">
                  <span>Room Charges ({booking.nights} {booking.nights === 1 ? 'night' : 'nights'})</span>
                  <span>₹{booking.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700 font-light">
                  <span>GST (12%)</span>
                  <span>₹{booking.gst.toLocaleString()}</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between items-center">
                  <span className="text-lg text-[#1B4332] tracking-wide">TOTAL PAID</span>
                  <span className="text-2xl text-[#1B4332] font-light">
                    ₹{booking.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {booking.specialRequests && (
              <>
                <div className="h-px bg-gray-200"></div>
                <div>
                  <p className="text-xs text-gray-500 tracking-wider mb-2">SPECIAL REQUESTS</p>
                  <p className="text-gray-700 font-light">{booking.specialRequests}</p>
                </div>
              </>
            )}
          </div>

          {/* Status */}
          <div className="bg-[#F5F1E8] p-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              <span className="text-green-700 tracking-wider text-sm">
                PAYMENT CONFIRMED
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate(`/invoice/${booking.bookingId}`)}
            className="bg-white border-2 border-[#1B4332] text-[#1B4332] px-6 py-4 tracking-wider text-sm hover:bg-[#F5F1E8] transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            DOWNLOAD INVOICE
          </button>
          
          <button
            onClick={() => navigate('/my-bookings')}
            className="bg-[#1B4332] text-white px-6 py-4 tracking-wider text-sm hover:bg-[#2D5940] transition-all flex items-center justify-center gap-2"
          >
            VIEW MY BOOKINGS
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Important Information */}
        <div className="mt-8 bg-white border-l-4 border-[#1B4332] p-6">
          <h3 className="text-sm text-[#1B4332] tracking-wider mb-3">IMPORTANT INFORMATION</h3>
          <ul className="space-y-2 text-sm text-gray-600 font-light">
            <li>• Check-in time: 2:00 PM | Check-out time: 11:00 AM</li>
            <li>• Please carry a valid ID proof at the time of check-in</li>
            <li>• A confirmation SMS has been sent to your registered mobile number</li>
            <li>• For any queries, call us at +91 9876543210</li>
          </ul>
        </div>
      </div>
    </div>
  );
}