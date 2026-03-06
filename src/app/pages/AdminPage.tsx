import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  Calendar, 
  IndianRupee, 
  Hotel, 
  Users, 
  Upload,
  TrendingUp,
  Eye,
  Settings
} from 'lucide-react';
import { AdminCalendar } from '../components/AdminCalendar';
import { RoomManagement } from '../components/RoomManagement';
import { BackButton } from '../components/BackButton';

interface Booking {
  id: string;
  roomId?: string; // Room number
  roomType: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: string;
}

export function AdminPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedView, setSelectedView] = useState<'dashboard' | 'calendar' | 'rooms'>('dashboard');
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    roomsOccupied: 0,
    occupancyRate: 0,
  });

  useEffect(() => {
    // Check if user is admin (simplified - in real app, check auth)
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      // For demo, auto-set as admin
      localStorage.setItem('isAdmin', 'true');
    }

    // Load bookings
    const savedBookings = localStorage.getItem('bookings');
    const allBookings = savedBookings ? JSON.parse(savedBookings) : [
      {
        id: 'BK20250301',
        roomType: 'Deluxe Room',
        checkIn: '2025-03-15',
        checkOut: '2025-03-17',
        totalPrice: 4500,
        status: 'Confirmed',
      },
      {
        id: 'BK20250215',
        roomType: 'Standard Room',
        checkIn: '2025-02-20',
        checkOut: '2025-02-22',
        totalPrice: 3600,
        status: 'Completed',
      },
    ];
    setBookings(allBookings);

    // Calculate stats
    const totalRevenue = allBookings.reduce((sum: number, b: Booking) => sum + b.totalPrice, 0);
    const confirmedBookings = allBookings.filter((b: Booking) => b.status === 'Confirmed').length;
    
    setStats({
      totalBookings: allBookings.length,
      totalRevenue,
      roomsOccupied: confirmedBookings,
      occupancyRate: Math.round((confirmedBookings / 20) * 100), // Assuming 20 total rooms
    });
  }, []);

  const handleImageUpload = () => {
    alert('Image upload functionality would be implemented here with a proper backend.');
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-20">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl text-[#1B4332] tracking-wide font-light mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 font-light">
              The Swiss Residency Management
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedView('dashboard')}
                className={`px-4 py-2 text-sm tracking-wider transition-colors ${
                  selectedView === 'dashboard'
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-white text-gray-700 hover:bg-[#F5F1E8]'
                }`}
              >
                DASHBOARD
              </button>
              <button
                onClick={() => setSelectedView('calendar')}
                className={`px-4 py-2 text-sm tracking-wider transition-colors ${
                  selectedView === 'calendar'
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-white text-gray-700 hover:bg-[#F5F1E8]'
                }`}
              >
                CALENDAR
              </button>
              <button
                onClick={() => setSelectedView('rooms')}
                className={`px-4 py-2 text-sm tracking-wider transition-colors ${
                  selectedView === 'rooms'
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-white text-gray-700 hover:bg-[#F5F1E8]'
                }`}
              >
                ROOMS
              </button>
            </div>
            <BackButton />
          </div>
        </div>

        {/* Stats Cards */}
        {selectedView === 'dashboard' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-8 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-xs text-gray-500 tracking-wider mb-2">
                  TOTAL BOOKINGS
                </p>
                <p className="text-3xl text-[#1B4332] font-light">
                  {stats.totalBookings}
                </p>
              </div>

              <div className="bg-white p-8 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded">
                    <IndianRupee className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-xs text-gray-500 tracking-wider mb-2">
                  TOTAL REVENUE
                </p>
                <p className="text-3xl text-[#1B4332] font-light">
                  ₹{stats.totalRevenue.toLocaleString()}
                </p>
              </div>

              <div className="bg-white p-8 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded">
                    <Hotel className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-xs text-gray-500 tracking-wider mb-2">
                  ROOMS OCCUPIED
                </p>
                <p className="text-3xl text-[#1B4332] font-light">
                  {stats.roomsOccupied}
                </p>
              </div>

              <div className="bg-white p-8 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-orange-50 text-orange-600 rounded">
                    <Users className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-xs text-gray-500 tracking-wider mb-2">
                  OCCUPANCY RATE
                </p>
                <p className="text-3xl text-[#1B4332] font-light">
                  {stats.occupancyRate}%
                </p>
              </div>
            </div>
          </>
        )}

        {/* Action Cards */}
        {selectedView === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-[#1B4332] text-white rounded">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl text-[#1B4332] tracking-wide font-light">
                    Upload Images
                  </h2>
                  <p className="text-sm text-gray-500 font-light">
                    Manage hotel gallery
                  </p>
                </div>
              </div>
              <button
                onClick={handleImageUpload}
                className="w-full bg-[#1B4332] text-white py-3 tracking-wider text-sm hover:bg-[#2D5940] transition-colors"
              >
                UPLOAD NEW IMAGES
              </button>
            </div>

            <div className="bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-[#1B4332] text-white rounded">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl text-[#1B4332] tracking-wide font-light">
                    View All Bookings
                  </h2>
                  <p className="text-sm text-gray-500 font-light">
                    Manage reservations
                  </p>
                </div>
              </div>
              <button
                onClick={() => {/* Would open bookings management */}}
                className="w-full border-2 border-[#1B4332] text-[#1B4332] py-3 tracking-wider text-sm hover:bg-[#1B4332] hover:text-white transition-colors"
              >
                VIEW BOOKINGS
              </button>
            </div>
          </div>
        )}

        {/* Recent Bookings Table */}
        {selectedView === 'dashboard' && (
          <div className="bg-white shadow-sm">
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-2xl text-[#1B4332] tracking-wide font-light">
                Recent Bookings
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5F1E8] border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider">
                      BOOKING ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider">
                      ROOM TYPE
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider">
                      CHECK-IN
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider">
                      CHECK-OUT
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider">
                      AMOUNT
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-[#F5F1E8]/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-[#1B4332] font-medium">
                        {booking.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-light">
                        {booking.roomType}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-light">
                        {booking.checkIn}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-light">
                        {booking.checkOut}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#1B4332] font-medium">
                        ₹{booking.totalPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-xs tracking-wider ${
                            booking.status === 'Confirmed'
                              ? 'bg-green-50 text-green-600 border border-green-200'
                              : 'bg-gray-50 text-gray-600 border border-gray-200'
                          }`}
                        >
                          {booking.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Calendar View */}
        {selectedView === 'calendar' && (
          <AdminCalendar
            onDateClick={(date) => {
              console.log('Selected date:', date);
            }}
          />
        )}

        {/* Rooms Management */}
        {selectedView === 'rooms' && (
          <RoomManagement />
        )}
      </div>
    </div>
  );
}