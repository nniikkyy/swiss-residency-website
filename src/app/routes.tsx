import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { BookingPage } from './pages/BookingPage';
import { LuxuryBookingPage } from './pages/LuxuryBookingPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { RoomDetailPage } from './pages/RoomDetailPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { LuxuryMyBookingsPage } from './pages/LuxuryMyBookingsPage';
import { InvoicesPage } from './pages/InvoicesPage';
import { InvoicePage } from './pages/InvoicePage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { Navigation } from './components/Navigation';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {children}
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/book',
    element: <BookingPage />,
  },
  {
    path: '/luxury-book',
    element: <LuxuryBookingPage />,
  },
  {
    path: '/booking-confirmation/:bookingId',
    element: <BookingConfirmationPage />,
  },
  {
    path: '/dashboard',
    element: (
      <Layout>
        <DashboardPage />
      </Layout>
    ),
  },
  {
    path: '/my-bookings',
    element: (
      <Layout>
        <MyBookingsPage />
      </Layout>
    ),
  },
  {
    path: '/luxury-my-bookings',
    element: (
      <Layout>
        <LuxuryMyBookingsPage />
      </Layout>
    ),
  },
  {
    path: '/invoices',
    element: (
      <Layout>
        <InvoicesPage />
      </Layout>
    ),
  },
  {
    path: '/invoice/:bookingId',
    element: (
      <Layout>
        <InvoicePage />
      </Layout>
    ),
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <ProfilePage />
      </Layout>
    ),
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/rooms/:roomType',
    element: (
      <Layout>
        <RoomDetailPage />
      </Layout>
    ),
  },
]);