import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Eye, Download } from 'lucide-react';
import { useNavigate } from 'react-router';
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

export function InvoicesPage() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<Booking[]>([]);

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      setInvoices(JSON.parse(savedBookings));
    } else {
      // Mock data
      setInvoices([
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
      ]);
    }
  }, []);

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
            Invoices
          </h1>
          <p className="text-gray-500 font-light">
            View and download your invoices
          </p>
        </div>

        {/* Invoices List */}
        <div className="bg-white shadow-sm">
          <div className="divide-y divide-gray-100">
            {invoices.map((invoice) => {
              const tax = invoice.totalPrice * 0.12;
              const total = invoice.totalPrice + tax;

              return (
                <div
                  key={invoice.id}
                  className="p-6 hover:bg-[#F5F1E8]/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-[#1B4332] font-medium">
                          Invoice #{invoice.id}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {format(new Date(invoice.createdAt), 'dd MMM yyyy')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-light mb-1">
                        {invoice.roomType} • {invoice.nights} {invoice.nights === 1 ? 'night' : 'nights'}
                      </p>
                      <p className="text-xs text-gray-500 font-light">
                        {format(new Date(invoice.checkIn), 'dd MMM')} - {format(new Date(invoice.checkOut), 'dd MMM yyyy')}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-2xl text-[#1B4332] font-light">
                          ₹{total.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">incl. taxes</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/invoice/${invoice.id}`)}
                          className="p-3 text-[#1B4332] border border-[#1B4332] hover:bg-[#1B4332] hover:text-white transition-colors"
                          title="View Invoice"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/invoice/${invoice.id}`)}
                          className="p-3 bg-[#1B4332] text-white hover:bg-[#2D5940] transition-colors"
                          title="Download Invoice"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}