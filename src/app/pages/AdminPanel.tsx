import { useState, useEffect } from 'react';
import { Hotel, IndianRupee, Calendar as CalendarIcon, Upload, Settings, TrendingUp } from 'lucide-react';
import { AdminCalendar } from '../components/AdminCalendar';

interface AdminStats {
  totalBookings: number;
  totalRevenue: number;
  roomsOccupied: number;
  occupancyRate: number;
}

export function AdminPanel() {
  const [stats, setStats] = useState<AdminStats>({
    totalBookings: 0,
    totalRevenue: 0,
    roomsOccupied: 0,
    occupancyRate: 0
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [selectedView, setSelectedView] = useState<'dashboard' | 'calendar' | 'rooms'>('dashboard');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = () => {
    // For demo: Load from localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum: number, b: any) => sum + (b.totalPrice || 0), 0);
    const confirmedBookings = bookings.filter((b: any) => b.status === 'Confirmed');
    const roomsOccupied = confirmedBookings.length;
    const occupancyRate = Math.round((roomsOccupied / 25) * 100); // 25 total rooms

    setStats({
      totalBookings,
      totalRevenue,
      roomsOccupied,
      occupancyRate
    });

    setRecentBookings(bookings.slice(-10).reverse());
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-20">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl text-[#1B4332] tracking-wide font-light">
              Admin Dashboard
            </h1>
            <div className="px-4 py-2 bg-orange-100 border border-orange-200">
              <span className="text-sm text-orange-700 tracking-wider">ADMIN ACCESS</span>
            </div>
          </div>
          <div className="w-32 h-px bg-[#1B4332]"></div>
        </div>

        {/* View Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedView('dashboard')}
            className={`px-6 py-3 tracking-wider text-sm transition-all ${
              selectedView === 'dashboard'
                ? 'bg-[#1B4332] text-white'
                : 'bg-white text-gray-700 hover:bg-[#F5F1E8]'
            }`}
          >
            DASHBOARD
          </button>
          <button
            onClick={() => setSelectedView('calendar')}
            className={`px-6 py-3 tracking-wider text-sm transition-all ${
              selectedView === 'calendar'
                ? 'bg-[#1B4332] text-white'
                : 'bg-white text-gray-700 hover:bg-[#F5F1E8]'
            }`}
          >
            CALENDAR VIEW
          </button>
          <button
            onClick={() => setSelectedView('rooms')}
            className={`px-6 py-3 tracking-wider text-sm transition-all ${
              selectedView === 'rooms'
                ? 'bg-[#1B4332] text-white'
                : 'bg-white text-gray-700 hover:bg-[#F5F1E8]'
            }`}
          >
            MANAGE ROOMS
          </button>
        </div>

        {/* Dashboard View */}
        {selectedView === 'dashboard' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Total Bookings */}
              <div className="bg-white p-8 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <CalendarIcon className="w-10 h-10 text-[#1B4332]" />
                  <div className="w-12 h-12 bg-[#F5F1E8] rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[#1B4332]" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2 tracking-wider font-light">
                  TOTAL BOOKINGS
                </p>
                <p className="text-4xl text-[#1B4332] font-light">
                  {stats.totalBookings}
                </p>
              </div>

              {/* Total Revenue */}
              <div className="bg-white p-8 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <IndianRupee className="w-10 h-10 text-[#1B4332]" />
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <IndianRupee className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2 tracking-wider font-light">
                  TOTAL REVENUE
                </p>
                <p className="text-4xl text-[#1B4332] font-light">
                  ₹{stats.totalRevenue.toLocaleString()}
                </p>
              </div>

              {/* Rooms Occupied */}
              <div className="bg-white p-8 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Hotel className="w-10 h-10 text-[#1B4332]" />
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <Hotel className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2 tracking-wider font-light">
                  ROOMS OCCUPIED
                </p>
                <p className="text-4xl text-[#1B4332] font-light">
                  {stats.roomsOccupied}<span className="text-2xl text-gray-400">/25</span>
                </p>
              </div>

              {/* Occupancy Rate */}
              <div className="bg-white p-8 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-10 h-10 text-[#1B4332]" />
                  <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2 tracking-wider font-light">
                  OCCUPANCY RATE
                </p>
                <p className="text-4xl text-[#1B4332] font-light">
                  {stats.occupancyRate}%
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <button className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow text-left group">
                <Upload className="w-12 h-12 text-[#1B4332] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl text-[#1B4332] mb-2 tracking-wide">
                  Upload Room Images
                </h3>
                <p className="text-sm text-gray-600 font-light">
                  Add or update room photos to attract more guests
                </p>
              </button>

              <button className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow text-left group">
                <Hotel className="w-12 h-12 text-[#1B4332] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl text-[#1B4332] mb-2 tracking-wide">
                  Add New Room
                </h3>
                <p className="text-sm text-gray-600 font-light">
                  Create new room types and set pricing
                </p>
              </button>

              <button className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow text-left group">
                <Settings className="w-12 h-12 text-[#1B4332] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl text-[#1B4332] mb-2 tracking-wide">
                  Block Dates
                </h3>
                <p className="text-sm text-gray-600 font-light">
                  Manage room availability and block dates
                </p>
              </button>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white p-8 shadow-lg">
              <h2 className="text-2xl text-[#1B4332] mb-6 tracking-wide font-light">
                Recent Bookings
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-sm text-gray-600 font-light tracking-wider">
                        BOOKING ID
                      </th>
                      <th className="text-left py-4 px-4 text-sm text-gray-600 font-light tracking-wider">
                        ROOM TYPE
                      </th>
                      <th className="text-left py-4 px-4 text-sm text-gray-600 font-light tracking-wider">
                        DATES
                      </th>
                      <th className="text-left py-4 px-4 text-sm text-gray-600 font-light tracking-wider">
                        GUESTS
                      </th>
                      <th className="text-left py-4 px-4 text-sm text-gray-600 font-light tracking-wider">
                        AMOUNT
                      </th>
                      <th className="text-left py-4 px-4 text-sm text-gray-600 font-light tracking-wider">
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.length > 0 ? (
                      recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-100 hover:bg-[#F5F1E8]/50">
                          <td className="py-4 px-4 text-sm text-gray-700">
                            {booking.id}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-700">
                            {booking.roomType}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-700">
                            {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-700">
                            {booking.guests}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-700">
                            ₹{booking.totalPrice?.toLocaleString()}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 text-xs tracking-wider ${
                              booking.status === 'Confirmed'
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-gray-50 text-gray-700 border border-gray-200'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-gray-500 font-light">
                          No bookings yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Calendar View */}
        {selectedView === 'calendar' && (
          <div>
            <AdminCalendar
              onDateClick={(date) => {
                console.log('Selected date:', date);
              }}
            />
          </div>
        )}

        {/* Manage Rooms View */}
        {selectedView === 'rooms' && (
          <div className="bg-white p-8 shadow-lg">
            <h2 className="text-2xl text-[#1B4332] mb-6 tracking-wide font-light">
              Manage Rooms
            </h2>
            <p className="text-gray-600 font-light mb-6">
              Room management interface coming soon. This will allow you to add, edit, and delete room types.
            </p>
            <button className="bg-[#1B4332] text-white px-6 py-3 tracking-wider text-sm hover:bg-[#2D5940] transition-colors">
              ADD NEW ROOM TYPE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
