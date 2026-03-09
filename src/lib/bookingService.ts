import { supabase } from "./supabase";
import type { Room, RoomType, Booking, AvailabilityCheck } from "./types";

/**
 * PROFESSIONAL OVERLAP LOGIC
 * A room is unavailable if:
 * newCheckIn < existingCheckOut AND newCheckOut > existingCheckIn
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
 * Get all rooms
 */

export async function getRoomTypes() {

  const { data, error } = await supabase
    .from("rooms")
    .select("room_type_id, name, price_per_night")
    .order("price_per_night");

  if (error) {
    console.error(error)
    throw error
  }

  return data
}
export async function getRooms(): Promise<Room[]> {
  const { data, error } = await supabase
    .from("rooms")
    .select("*");

  if (error) {
    console.error(error);
    throw error;
  }

  return data || [];
}

/**
 * Get rooms by room type
 */
export async function getRoomsByType(roomTypeId: string): Promise<Room[]> {

  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("room_type_id", roomTypeId);

  if (error) throw error;

  return data || [];
}

/**
 * Get all bookings
 */
async function getBookings(): Promise<Booking[]> {

  const { data, error } = await supabase
    .from("bookings")
    .select("*");

  if (error) throw error;

  return data || [];
}

/**
 * CHECK ROOM AVAILABILITY
 */
export async function checkRoomAvailability(
  roomTypeId: string,
  checkInDate: string,
  checkOutDate: string
): Promise<AvailabilityCheck> {

  const rooms = await getRoomsByType(roomTypeId);
  const bookings = await getBookings();

  const availableRoomIds: string[] = [];

  for (const room of rooms) {

    const roomBookings = bookings.filter(
      b => b.room_id === room.id && b.status !== "cancelled"
    );

    const conflict = roomBookings.some(booking =>
      hasOverlap(
        checkInDate,
        checkOutDate,
        booking.check_in,
        booking.check_out
      )
    );

    if (!conflict) {
      availableRoomIds.push(room.id);
    }
  }

  return {
    roomTypeId,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    availableRoomIds,
    totalRooms: rooms.length,
    availableCount: availableRoomIds.length,
    isAvailable: availableRoomIds.length > 0
  };
}

/**
 * CREATE BOOKING
 */
export async function createBooking(
  bookingData: Omit<Booking, "booking_id" | "room_id" | "created_at">
): Promise<{ bookingId: string; roomId: string }> {

  const availability = await checkRoomAvailability(
    bookingData.room_type_id,
    bookingData.check_in,
    bookingData.check_out
  );

  if (!availability.isAvailable) {
    throw new Error("No rooms available");
  }

  const assignedRoomId = availability.availableRoomIds[0];

  const bookingId = `BKG${Date.now()}`;

  const { error } = await supabase
    .from("bookings")
    .insert([
      {
        booking_id: bookingId,
        room_id: assignedRoomId,
        room_type_id: bookingData.room_type_id,
        user_id: bookingData.user_id,
        check_in: bookingData.check_in,
        check_out: bookingData.check_out,
        status: "confirmed",
        payment_status: "pending",
        created_at: new Date()
      }
    ]);

  if (error) {
    console.error(error);
    throw error;
  }

  return {
    bookingId,
    roomId: assignedRoomId
  };
}

/**
 * CANCEL BOOKING
 */
export async function cancelBooking(bookingId: string): Promise<void> {

  const { error } = await supabase
    .from("bookings")
    .update({
      status: "cancelled"
    })
    .eq("booking_id", bookingId);

  if (error) throw error;
}

/**
 * GET USER BOOKINGS
 */
export async function getUserBookings(userId: string): Promise<Booking[]> {

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return data || [];
}

/**
 * CALCULATE NIGHTS
 */
export function calculateNights(checkIn: string, checkOut: string): number {

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  const diff = end.getTime() - start.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * CALCULATE PRICE
 */
export function calculateBookingPrice(
  roomPrice: number,
  nights: number,
  gstRate: number = 0.12
) {

  const subtotal = roomPrice * nights;

  const gst = subtotal * gstRate;

  const total = subtotal + gst;

  return {
    subtotal,
    gst,
    total
  };
}