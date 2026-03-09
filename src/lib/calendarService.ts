import { supabase } from "./supabase";

export type CalendarEvent = {
    id: string
    room_id: string
    check_in: string
    check_out: string
    status: string
}

/**
 * Fetch all bookings for calendar
 */
export async function getCalendarBookings(): Promise<CalendarEvent[]> {

    const { data, error } = await supabase
        .from("bookings")
        .select("*");

    if (error) {
        console.error(error);
        throw error;
    }

    return data || [];
}

/**
 * Subscribe to realtime booking updates
 */
export function subscribeToCalendarUpdates(
    callback: (payload: any) => void
) {

    const channel = supabase
        .channel("booking-calendar")

        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "bookings"
            },
            (payload) => {
                callback(payload);
            }
        )

        .subscribe();

    return channel;
}

/**
 * Unsubscribe realtime
 */
export function unsubscribeCalendar(channel: any) {
    supabase.removeChannel(channel);
}