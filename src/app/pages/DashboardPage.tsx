import { DashboardLayout } from '../components/DashboardLayout';
import { Calendar, IndianRupee, Hotel, Clock } from 'lucide-react';
import { BackButton } from '../components/BackButton';

export function DashboardPage() {
  const stats = [
    { icon: Calendar, label: 'Total Bookings', value: '12', color: 'bg-blue-50 text-blue-600' },
    { icon: IndianRupee, label: 'Total Spent', value: '₹48,500', color: 'bg-green-50 text-green-600' },
    { icon: Hotel, label: 'Active Bookings', value: '2', color: 'bg-purple-50 text-purple-600' },
    { icon: Clock, label: 'Upcoming', value: '1', color: 'bg-orange-50 text-orange-600' },
  ];

  const recentBookings = [
    {
      id: 'BK20250301',
      roomType: 'Deluxe Room',
      checkIn: '2025-03-15',
      checkOut: '2025-03-17',
      status: 'Confirmed',
      amount: 4500,
    },
    {
      id: 'BK20250215',
      roomType: 'Standard Room',
      checkIn: '2025-02-20',
      checkOut: '2025-02-22',
      status: 'Completed',
      amount: 3600,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Back Button */}
        <div>
          <BackButton />
        </div>

        {/* Header */}
        <div>
          <h1 className="text-3xl text-[#1B4332] tracking-wide font-light mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 font-light">
            Manage your bookings and account
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-500 tracking-wider mb-2">
                      {stat.label.toUpperCase()}
                    </p>
                    <p className="text-2xl text-[#1B4332] font-light">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white p-8 shadow-sm">
          <h2 className="text-xl text-[#1B4332] tracking-wide font-light mb-6">
            Recent Bookings
          </h2>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 border border-gray-100 hover:border-[#1B4332] transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-sm text-[#1B4332] font-medium">
                      {booking.id}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs tracking-wider ${
                        booking.status === 'Confirmed'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-50 text-gray-600'
                      }`}
                    >
                      {booking.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-light">
                    {booking.roomType} • {booking.checkIn} to {booking.checkOut}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg text-[#1B4332] font-light">
                    ₹{booking.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/book"
            className="bg-[#1B4332] text-white p-8 text-center hover:bg-[#2D5940] transition-colors group"
          >
            <Calendar className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg tracking-wider">BOOK A ROOM</h3>
          </a>
          <a
            href="/my-bookings"
            className="bg-white border-2 border-[#1B4332] text-[#1B4332] p-8 text-center hover:bg-[#1B4332] hover:text-white transition-colors group"
          >
            <Hotel className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg tracking-wider">VIEW ALL BOOKINGS</h3>
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}