import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import type { RoomType, Room } from './types';

/**
 * Room Types for The Swiss Residency
 */
const roomTypes: RoomType[] = [
  {
    id: 'standard',
    name: 'Standard Room',
    price: 2500,
    description: 'Comfortable and well-appointed rooms with modern amenities, perfect for business and leisure travelers.',
    amenities: [
      'Complimentary Breakfast',
      'Air Conditioning & Heater',
      'Daily Housekeeping',
      'Free Wi-Fi',
      'LED TV',
      'Attached Bathroom',
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
    description: 'Spacious luxury rooms with premium furnishings, offering enhanced comfort and elegance.',
    amenities: [
      'Complimentary Breakfast',
      'Air Conditioning & Heater',
      'Daily Housekeeping',
      'Lunch & Dinner Options',
      'Free Wi-Fi',
      'Smart TV',
      'Mini Refrigerator',
      'Work Desk',
      'Premium Bathroom Amenities',
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
    description: 'Luxurious suites with separate living area, perfect for extended stays and special occasions.',
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
      'Work Desk',
      'Premium Bathroom Amenities',
      'Bathtub',
      'Hot Water 24/7',
      'Room Service'
    ],
    images: [],
    maxGuests: 4,
    size: '650 sq ft'
  }
];

/**
 * Individual Rooms - Professional Hotel Structure
 * Room Numbers: 101-115 (Standard), 201-210 (Deluxe), 301-305 (Suite)
 */
function generateIndividualRooms(): Room[] {
  const rooms: Room[] = [];

  // Standard Rooms - Floor 1 (101-115) - 15 rooms
  for (let i = 101; i <= 115; i++) {
    rooms.push({
      id: i.toString(),
      roomTypeId: 'standard',
      floor: 1,
      status: 'active'
    });
  }

  // Deluxe Rooms - Floor 2 (201-210) - 10 rooms
  for (let i = 201; i <= 210; i++) {
    rooms.push({
      id: i.toString(),
      roomTypeId: 'deluxe',
      floor: 2,
      status: 'active'
    });
  }

  // Executive Suites - Floor 3 (301-305) - 5 rooms
  for (let i = 301; i <= 305; i++) {
    rooms.push({
      id: i.toString(),
      roomTypeId: 'suite',
      floor: 3,
      status: 'active'
    });
  }

  return rooms;
}

/**
 * Seed room types to Firestore
 */
export async function seedRoomTypes() {
  try {
    const roomTypesRef = collection(db, 'room_types');
    const existingRoomTypes = await getDocs(roomTypesRef);
    
    if (existingRoomTypes.empty) {
      console.log('Seeding room types...');
      
      for (const roomType of roomTypes) {
        await addDoc(roomTypesRef, roomType);
        console.log(`Added ${roomType.name}`);
      }
      
      console.log('Room types seeded successfully!');
    } else {
      console.log('Room types already exist.');
    }
  } catch (error) {
    console.error('Error seeding room types:', error);
    throw error;
  }
}

/**
 * Seed individual rooms to Firestore
 */
export async function seedRooms() {
  try {
    const roomsRef = collection(db, 'rooms');
    const existingRooms = await getDocs(roomsRef);
    
    if (existingRooms.empty) {
      console.log('Seeding individual rooms...');
      
      const rooms = generateIndividualRooms();
      
      for (const room of rooms) {
        await addDoc(roomsRef, room);
        console.log(`Added Room ${room.id} (${room.roomTypeId})`);
      }
      
      console.log(`Successfully seeded ${rooms.length} individual rooms!`);
    } else {
      console.log('Rooms already exist.');
    }
  } catch (error) {
    console.error('Error seeding rooms:', error);
    throw error;
  }
}

/**
 * Initialize all hotel data
 */
export async function initializeHotelData() {
  try {
    await seedRoomTypes();
    await seedRooms();
    console.log('Hotel data initialization complete!');
  } catch (error) {
    console.error('Error initializing hotel data:', error);
  }
}
