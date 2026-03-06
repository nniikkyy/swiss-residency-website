import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  status: 'available' | 'booked' | 'blocked';
  bookingCount?: number;
}

interface AdminCalendarProps {
  roomId?: string;
  onDateClick?: (date: Date) => void;
}

export function AdminCalendar({ roomId, onDateClick }: AdminCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);

  useEffect(() => {
    generateCalendar();
  }, [currentDate, roomId]);

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get day of week for first day (0 = Sunday)
    const startingDayOfWeek = firstDay.getDay();

    // Calculate days to show from previous month
    const previousMonthDays: CalendarDay[] = [];
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      previousMonthDays.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        status: 'available'
      });
    }

    // Current month days
    const currentMonthDays: CalendarDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      
      // Simulate booking status (in production, this would query Firestore)
      const randomStatus = Math.random();
      let status: 'available' | 'booked' | 'blocked' = 'available';
      
      if (randomStatus > 0.7) {
        status = 'booked';
      } else if (randomStatus > 0.6) {
        status = 'blocked';
      }

      currentMonthDays.push({
        date,
        isCurrentMonth: true,
        isToday: date.getTime() === today.getTime(),
        status,
        bookingCount: status === 'booked' ? Math.floor(Math.random() * 5) + 1 : 0
      });
    }

    // Next month days to fill grid
    const totalDays = previousMonthDays.length + currentMonthDays.length;
    const remainingDays = 35 - totalDays; // Show 5 weeks
    const nextMonthDays: CalendarDay[] = [];

    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      nextMonthDays.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        status: 'available'
      });
    }

    setCalendarDays([...previousMonthDays, ...currentMonthDays, ...nextMonthDays]);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl text-[#1B4332] tracking-wide font-light">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 border border-gray-200 hover:border-[#1B4332] hover:bg-[#F5F1E8] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#1B4332]" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 border border-gray-200 hover:border-[#1B4332] hover:bg-[#F5F1E8] transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-[#1B4332]" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-200"></div>
          <span className="text-gray-600 font-light">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-200"></div>
          <span className="text-gray-600 font-light">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 border border-gray-300"></div>
          <span className="text-gray-600 font-light">Blocked</span>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-sm text-[#1B4332] font-light tracking-wider py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => onDateClick?.(day.date)}
            className={`
              aspect-square p-2 border text-sm transition-all
              ${!day.isCurrentMonth ? 'opacity-30' : ''}
              ${day.isToday ? 'border-[#1B4332] border-2' : 'border-gray-200'}
              ${day.status === 'booked' ? 'bg-red-50 border-red-200' : ''}
              ${day.status === 'blocked' ? 'bg-gray-200 border-gray-300' : ''}
              ${day.status === 'available' && day.isCurrentMonth ? 'hover:bg-[#F5F1E8] hover:border-[#1B4332]/50' : ''}
            `}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <span className={`
                ${day.isToday ? 'text-[#1B4332] font-medium' : 'text-gray-700'}
                ${!day.isCurrentMonth ? 'text-gray-400' : ''}
              `}>
                {day.date.getDate()}
              </span>
              {day.bookingCount && day.bookingCount > 0 && (
                <span className="text-xs text-red-600 mt-1">
                  {day.bookingCount}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Footer info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 font-light">
          Click on a date to view or manage bookings
        </p>
      </div>
    </div>
  );
}
