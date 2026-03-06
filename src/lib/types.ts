// Database type definitions

export interface User {
  uid: string;
  name: string;
  phone: string;
  email?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

// Room Types (Deluxe, Suite, Standard)
export interface RoomType {
  id: string;
  name: string; // "Deluxe Room", "Suite", etc.
  price: number;
  description: string;
  amenities: string[];
  images: string[];
  maxGuests: number;
  size: string; // e.g., "400 sq ft"
}

// Individual Rooms (101, 102, 103...)
export interface Room {
  id: string; // Room number: "101", "102", "201", etc.
  roomTypeId: string; // References RoomType
  floor: number;
  status: 'active' | 'maintenance' | 'disabled';
  features?: string[]; // Optional special features for this specific room
}

export interface Booking {
  bookingId: string;
  userId: string;
  roomId: string; // SPECIFIC ROOM NUMBER (e.g., "101")
  roomTypeId: string; // Room type reference
  roomTypeName: string; // For display
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  guests: number;
  nights: number;
  subtotal: number;
  gst: number;
  totalAmount: number;
  status: 'confirmed' | 'cancelled' | 'completed' | 'pending';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AvailabilityCheck {
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  availableRoomIds: string[]; // List of available room numbers
  totalRooms: number;
  availableCount: number;
  isAvailable: boolean;
}