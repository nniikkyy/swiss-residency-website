import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Calendar, Eye, Download } from 'lucide-react';
import { BackButton } from '../components/BackButton';

interface Booking {
  id: string;
  roomId?: string; // Room number (101, 102, etc.)
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export function MyBookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      // Mock data if no bookings exist
      setBookings([
        {
          id: 'BK20250301',
          roomType: 'Deluxe Room',
          checkIn: '2025-03-15',
          checkOut: '2025-03-17',
          guests: 2,
          nights: 2,
          totalPrice: 4500,
          status: 'Confirmed',
          createdAt: '2025-03-01T10:00:00Z',
        },
        {
          id: 'BK20250215',
          roomType: 'Standard Room',
          checkIn: '2025-02-20',
          checkOut: '2025-02-22',
          guests: 1,
          nights: 2,
          totalPrice: 3600,
          status: 'Completed',
          createdAt: '2025-02-15T14:30:00Z',
        },
        {
          id: 'BK20250110',
          roomType: 'Deluxe Room',
          checkIn: '2025-01-25',
          checkOut: '2025-01-27',
          guests: 2,
          nights: 2,
          totalPrice: 4500,
          status: 'Completed',
          createdAt: '2025-01-10T09:15:00Z',
        },
      ]);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'Completed':
        return 'bg-gray-50 text-gray-600 border-gray-200';
      case 'Cancelled':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-blue-50 text-blue-600 border-blue-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Back Button */}
        <div>
          <BackButton />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-[#1B4332] tracking-wide font-light mb-2">
              My Bookings
            </h1>
            <p className="text-gray-500 font-light">
              View and manage your reservations
            </p>
          </div>
          <button
            onClick={() => navigate('/book')}
            className="bg-[#1B4332] text-white px-6 py-3 text-sm tracking-wider hover:bg-[#2D5940] transition-colors"
          >
            NEW BOOKING
          </button>
        </div>

        {/* Bookings Table */}
        <div className="bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F1E8] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider">
                    BOOKING ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider">
                    ROOM NO
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider">
                    ROOM TYPE
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider">
                    DATES
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider">
                    GUESTS
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider">
                    AMOUNT
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider">
                    STATUS
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-light">No bookings yet</p>
                      <button
                        onClick={() => navigate('/book')}
                        className="mt-4 text-[#1B4332] hover:underline text-sm"
                      >
                        Make your first booking
                      </button>
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-[#F5F1E8]/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm text-[#1B4332] font-medium">
                          {booking.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700 font-light">
                          {booking.roomId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700 font-light">
                          {booking.roomType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 font-light">
                          <div>{booking.checkIn}</div>
                          <div className="text-gray-500">to {booking.checkOut}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700 font-light">
                          {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-[#1B4332] font-medium">
                          ₹{booking.totalPrice.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-xs tracking-wider border ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/invoice/${booking.id}`)}
                            className="p-2 text-[#1B4332] hover:bg-[#E8DCC4] transition-colors"
                            title="View Invoice"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/invoice/${booking.id}`)}
                            className="p-2 text-[#1B4332] hover:bg-[#E8DCC4] transition-colors"
                            title="Download Invoice"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        {bookings.length > 0 && (
          <div className="bg-white p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl text-[#1B4332] font-light mb-1">
                  {bookings.length}
                </p>
                <p className="text-xs text-gray-500 tracking-wider">
                  TOTAL BOOKINGS
                </p>
              </div>
              <div>
                <p className="text-2xl text-[#1B4332] font-light mb-1">
                  {bookings.filter((b) => b.status === 'Confirmed').length}
                </p>
                <p className="text-xs text-gray-500 tracking-wider">
                  CONFIRMED
                </p>
              </div>
              <div>
                <p className="text-2xl text-[#1B4332] font-light mb-1">
                  ₹{bookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 tracking-wider">
                  TOTAL SPENT
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}