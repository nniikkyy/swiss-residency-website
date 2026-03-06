import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Download, ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { BackButton } from '../components/BackButton';

interface Booking {
  id: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export function InvoicePage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    // Load booking from localStorage
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      const bookings = JSON.parse(savedBookings);
      const found = bookings.find((b: Booking) => b.id === bookingId);
      if (found) {
        setBooking(found);
      }
    }

    // Mock data fallback
    if (!booking && bookingId) {
      setBooking({
        id: bookingId,
        roomType: 'Deluxe Room',
        checkIn: '2025-03-15',
        checkOut: '2025-03-17',
        guests: 2,
        nights: 2,
        totalPrice: 4500,
        status: 'Confirmed',
        createdAt: '2025-03-01T10:00:00Z',
      });
    }
  }, [bookingId]);

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Booking not found</p>
          <button
            onClick={() => navigate('/my-bookings')}
            className="text-[#1B4332] hover:underline"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  const pricePerNight = booking.totalPrice / booking.nights;
  const tax = booking.totalPrice * 0.12; // 12% GST
  const grandTotal = booking.totalPrice + tax;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-20">
      <div className="max-w-4xl mx-auto px-8">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <BackButton />
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#1B4332] text-white px-6 py-3 text-sm tracking-wider hover:bg-[#2D5940] transition-colors"
          >
            <Download className="w-4 h-4" />
            DOWNLOAD PDF
          </button>
        </div>

        {/* Invoice Card */}
        <div className="bg-white shadow-lg print:shadow-none">
          {/* Invoice Header */}
          <div className="border-b-2 border-[#1B4332] p-12">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl text-[#1B4332] tracking-[0.2em] mb-2">
                  THE SWISS RESIDENCY
                </h1>
                <div className="w-32 h-px bg-[#1B4332] mb-6"></div>
                <div className="space-y-2 text-sm text-gray-600 font-light">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>E-146, 1st Cross St, Alpha 1, Block E,<br />Greater Noida, Uttar Pradesh 201310</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+91 84480 80864 / +91 74289 13864</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>info@theswissresidency.com</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-[#1B4332] text-white px-6 py-3 mb-4">
                  <p className="text-xs tracking-wider mb-1">INVOICE</p>
                  <p className="text-xl tracking-wide">{booking.id}</p>
                </div>
                <p className="text-sm text-gray-600 font-light">
                  Date: {format(new Date(booking.createdAt), 'dd MMM yyyy')}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="p-12 space-y-8">
            {/* Guest & Booking Info */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs text-[#1B4332] tracking-wider mb-3">
                  BOOKING DETAILS
                </h3>
                <div className="space-y-2 text-sm text-gray-700 font-light">
                  <div className="flex justify-between">
                    <span>Booking ID:</span>
                    <span className="font-medium">{booking.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-medium text-green-600">{booking.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Room Type:</span>
                    <span className="font-medium">{booking.roomType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span className="font-medium">{booking.guests}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xs text-[#1B4332] tracking-wider mb-3">
                  STAY PERIOD
                </h3>
                <div className="space-y-2 text-sm text-gray-700 font-light">
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span className="font-medium">
                      {format(new Date(booking.checkIn), 'dd MMM yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span className="font-medium">
                      {format(new Date(booking.checkOut), 'dd MMM yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Nights:</span>
                    <span className="font-medium">{booking.nights}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Table */}
            <div className="border border-gray-200">
              <table className="w-full">
                <thead className="bg-[#F5F1E8]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider">
                      DESCRIPTION
                    </th>
                    <th className="px-6 py-4 text-right text-xs text-[#1B4332] tracking-wider">
                      RATE
                    </th>
                    <th className="px-6 py-4 text-right text-xs text-[#1B4332] tracking-wider">
                      NIGHTS
                    </th>
                    <th className="px-6 py-4 text-right text-xs text-[#1B4332] tracking-wider">
                      AMOUNT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-700 font-light">
                      {booking.roomType}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-right">
                      ₹{pricePerNight.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-right">
                      {booking.nights}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-right font-medium">
                      ₹{booking.totalPrice.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-80 space-y-3">
                <div className="flex justify-between text-sm text-gray-700 font-light">
                  <span>Subtotal:</span>
                  <span>₹{booking.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700 font-light">
                  <span>GST (12%):</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="h-px bg-gray-300"></div>
                <div className="flex justify-between items-center bg-[#F5F1E8] p-4">
                  <span className="text-[#1B4332] tracking-wider">GRAND TOTAL</span>
                  <span className="text-2xl text-[#1B4332] font-light">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="border-t pt-8 mt-8">
              <p className="text-xs text-gray-500 font-light text-center">
                Thank you for choosing The Swiss Residency. We look forward to welcoming you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}