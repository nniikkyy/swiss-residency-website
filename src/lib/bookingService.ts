import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc,
  doc,
  getDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import type { Room, RoomType, Booking, BlockedDate, AvailabilityCheck } from './types';

/**
 * PROFESSIONAL OVERLAPPING LOGIC
 * Room is unavailable if:
 * New check-in < Existing check-out AND New check-out > Existing check-in
 */
function hasOverlap(
  newCheckIn: string,
  newCheckOut: string,
  existingCheckIn: string,
  existingCheckOut: string
): boolean {
  const newIn = new Date(newCheckIn);
  const newOut = new Date(newCheckOut);
  const existingIn = new Date(existingCheckIn);
  const existingOut = new Date(existingCheckOut);

  return newIn < existingOut && newOut > existingIn;
}

/**
 * Check room availability for a specific room type
 * Returns list of available room IDs
 * This is how professional hotel PMS works
 */
export async function checkRoomAvailability(
  roomTypeId: string,
  checkInDate: string,
  checkOutDate: string
): Promise<AvailabilityCheck> {
  try {
    // For demo: Use mock data if Firebase not configured
    // In production, this queries Firestore
    
    // Get all rooms of this type
    const mockRooms = getMockRooms().filter(r => 
      r.roomTypeId === roomTypeId && r.status === 'active'
    );

    // Get all bookings
    const mockBookings = getMockBookings();

    // Check each room for availability
    const availableRoomIds: string[] = [];

    for (const room of mockRooms) {
      // Find bookings for this specific room
      const roomBookings = mockBookings.filter(
        b => b.roomId === room.id && b.status !== 'cancelled'
      );

      // Check if any booking overlaps with requested dates
      const hasConflict = roomBookings.some(booking =>
        hasOverlap(checkInDate, checkOutDate, booking.checkIn, booking.checkOut)
      );

      if (!hasConflict) {
        availableRoomIds.push(room.id);
      }
    }

    return {
      roomTypeId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      availableRoomIds,
      totalRooms: mockRooms.length,
      availableCount: availableRoomIds.length,
      isAvailable: availableRoomIds.length > 0
    };

  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
}

/**
 * Create a new booking with automatic room assignment
 */
export async function createBooking(
  bookingData: Omit<Booking, 'bookingId' | 'roomId' | 'createdAt' | 'updatedAt'>
): Promise<{ bookingId: string; roomId: string }> {
  try {
    // Check availability and get available rooms
    const availability = await checkRoomAvailability(
      bookingData.roomTypeId,
      bookingData.checkIn,
      bookingData.checkOut
    );

    if (!availability.isAvailable || availability.availableRoomIds.length === 0) {
      throw new Error('No rooms available for selected dates');
    }

    // Auto-assign first available room
    const assignedRoomId = availability.availableRoomIds[0];

    // Generate booking ID
    const timestamp = Date.now();
    const bookingId = `BKG${timestamp.toString().slice(-8)}`;

    // In production, this would save to Firestore
    // For demo, save to localStorage
    const booking: Booking = {
      ...bookingData,
      bookingId,
      roomId: assignedRoomId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save to localStorage for demo
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, booking]));

    return { bookingId, roomId: assignedRoomId };

  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

/**
 * Cancel a booking
 */
export async function cancelBooking(bookingId: string): Promise<void> {
  try {
    // For demo: Update in localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = bookings.map((b: any) =>
      b.bookingId === bookingId
        ? { ...b, status: 'cancelled', paymentStatus: 'refunded', updatedAt: new Date() }
        : b
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
}

/**
 * Get user bookings
 */
export async function getUserBookings(userId: string): Promise<Booking[]> {
  try {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    return bookings.filter((b: any) => b.userId === userId);
  } catch (error) {
    console.error('Error getting user bookings:', error);
    throw error;
  }
}

/**
 * Get all room types
 */
export async function getRoomTypes(): Promise<RoomType[]> {
  try {
    // For demo: Return mock data
    return getMockRoomTypes();
  } catch (error) {
    console.error('Error getting room types:', error);
    throw error;
  }
}

/**
 * Get all individual rooms
 */
export async function getRooms(): Promise<Room[]> {
  try {
    // For demo: Return mock data
    return getMockRooms();
  } catch (error) {
    console.error('Error getting rooms:', error);
    throw error;
  }
}

/**
 * Get rooms by type
 */
export async function getRoomsByType(roomTypeId: string): Promise<Room[]> {
  try {
    const allRooms = await getRooms();
    return allRooms.filter(r => r.roomTypeId === roomTypeId);
  } catch (error) {
    console.error('Error getting rooms by type:', error);
    throw error;
  }
}

/**
 * Block a date for a specific room
 */
export async function blockRoomDate(
  roomId: string,
  date: string,
  reason: string,
  userId: string
): Promise<void> {
  try {
    const blockedDates = JSON.parse(localStorage.getItem('blocked_dates') || '[]');
    blockedDates.push({
      id: Date.now().toString(),
      roomId,
      date,
      reason,
      createdBy: userId,
      createdAt: new Date()
    });
    localStorage.setItem('blocked_dates', JSON.stringify(blockedDates));
  } catch (error) {
    console.error('Error blocking date:', error);
    throw error;
  }
}

/**
 * Calculate number of nights between two dates
 */
export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Calculate booking price
 */
export function calculateBookingPrice(
  roomPrice: number,
  nights: number,
  gstRate: number = 0.12
): { subtotal: number; gst: number; total: number } {
  const subtotal = roomPrice * nights;
  const gst = subtotal * gstRate;
  const total = subtotal + gst;

  return {
    subtotal,
    gst,
    total
  };
}

// ========== MOCK DATA FOR DEMO ==========

function getMockRoomTypes(): RoomType[] {
  return [
    {
      id: 'standard',
      name: 'Standard Room',
      price: 2500,
      description: 'Comfortable and well-appointed rooms with modern amenities',
      amenities: [
        'Complimentary Breakfast',
        'Air Conditioning & Heater',
        'Daily Housekeeping',
        'Free Wi-Fi',
        'LED TV',
        'Hot Water 24/7'
      ],
      images: [],
      maxGuests: 2,
      size: '350 sq ft'
    },
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      price: 3500,
      description: 'Spacious luxury rooms with premium furnishings',
      amenities: [
        'Complimentary Breakfast',
        'Air Conditioning & Heater',
        'Daily Housekeeping',
        'Lunch & Dinner Options',
        'Free Wi-Fi',
        'Smart TV',
        'Mini Refrigerator',
        'Work Desk',
        'Hot Water 24/7'
      ],
      images: [],
      maxGuests: 3,
      size: '450 sq ft'
    },
    {
      id: 'suite',
      name: 'Executive Suite',
      price: 5500,
      description: 'Luxurious suites with separate living area',
      amenities: [
        'Complimentary Breakfast',
        'Air Conditioning & Heater',
        'Daily Housekeeping',
        'Lunch & Dinner Options',
        'Free Wi-Fi',
        'Smart TV',
        'Mini Refrigerator',
        'Coffee Maker',
        'Separate Living Area',
        'Bathtub',
        'Room Service'
      ],
      images: [],
      maxGuests: 4,
      size: '650 sq ft'
    }
  ];
}

function getMockRooms(): Room[] {
  // Standard Rooms (101-115) - 15 rooms on Floor 1
  const standardRooms = Array.from({ length: 15 }, (_, i) => ({
    id: (101 + i).toString(),
    roomTypeId: 'standard',
    floor: 1,
    status: 'active' as const
  }));

  // Deluxe Rooms (201-210) - 10 rooms on Floor 2
  const deluxeRooms = Array.from({ length: 10 }, (_, i) => ({
    id: (201 + i).toString(),
    roomTypeId: 'deluxe',
    floor: 2,
    status: 'active' as const
  }));

  // Suites (301-305) - 5 rooms on Floor 3
  const suiteRooms = Array.from({ length: 5 }, (_, i) => ({
    id: (301 + i).toString(),
    roomTypeId: 'suite',
    floor: 3,
    status: 'active' as const
  }));

  return [...standardRooms, ...deluxeRooms, ...suiteRooms];
}

function getMockBookings(): Booking[] {
  // Sample bookings for demonstration
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  return bookings;
}
