import { useState, useEffect } from 'react';
import { Hotel, Edit, Trash2, Plus, Calendar } from 'lucide-react';
import { getRooms, getRoomTypes } from '../../lib/bookingService';
import type { Room, RoomType } from '../../lib/types';

export function RoomManagement() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterFloor, setFilterFloor] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [roomsData, typesData] = await Promise.all([
        getRooms(),
        getRoomTypes()
      ]);
      setRooms(roomsData);
      setRoomTypes(typesData);
    } catch (error) {
      console.error('Error loading room data:', error);
    }
  };

  const filteredRooms = rooms.filter(room => {
    if (filterType !== 'all' && room.roomTypeId !== filterType) return false;
    if (filterFloor !== 'all' && room.floor.toString() !== filterFloor) return false;
    return true;
  });

  const getRoomTypeName = (typeId: string) => {
    return roomTypes.find(t => t.id === typeId)?.name || typeId;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'maintenance':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'disabled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white shadow-lg">
      {/* Header */}
      <div className="p-8 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-[#1B4332] tracking-wide font-light mb-2">
            Room Management
          </h2>
          <p className="text-sm text-gray-600 font-light">
            Manage individual rooms • {rooms.length} total rooms
          </p>
        </div>
        <button className="bg-[#1B4332] text-white px-6 py-3 tracking-wider text-sm hover:bg-[#2D5940] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          ADD ROOM
        </button>
      </div>

      {/* Filters */}
      <div className="p-8 bg-[#F5F1E8] border-b border-gray-200">
        <div className="flex gap-4">
          <div>
            <label className="block text-xs text-[#1B4332] mb-2 tracking-wider">
              FILTER BY TYPE
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 focus:border-[#1B4332] focus:outline-none text-sm"
            >
              <option value="all">All Types</option>
              {roomTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-[#1B4332] mb-2 tracking-wider">
              FILTER BY FLOOR
            </label>
            <select
              value={filterFloor}
              onChange={(e) => setFilterFloor(e.target.value)}
              className="px-4 py-2 border border-gray-200 focus:border-[#1B4332] focus:outline-none text-sm"
            >
              <option value="all">All Floors</option>
              <option value="1">Floor 1</option>
              <option value="2">Floor 2</option>
              <option value="3">Floor 3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Room Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F5F1E8] border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider font-light">
                ROOM NO
              </th>
              <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider font-light">
                ROOM TYPE
              </th>
              <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider font-light">
                FLOOR
              </th>
              <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider font-light">
                STATUS
              </th>
              <th className="px-6 py-4 text-left text-xs text-[#1B4332] tracking-wider font-light">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredRooms.map((room) => (
              <tr key={room.id} className="hover:bg-[#F5F1E8]/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Hotel className="w-4 h-4 text-[#1B4332]" />
                    <span className="text-[#1B4332] font-medium">
                      {room.id}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 font-light">
                  {getRoomTypeName(room.roomTypeId)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 font-light">
                  Floor {room.floor}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 text-xs tracking-wider border ${getStatusColor(room.status)}`}>
                    {room.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 hover:bg-gray-100 transition-colors"
                      title="View Calendar"
                    >
                      <Calendar className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 transition-colors"
                      title="Edit Room"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 transition-colors"
                      title="Disable Room"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRooms.length === 0 && (
          <div className="p-12 text-center">
            <Hotel className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-light">
              No rooms found matching your filters
            </p>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="p-6 bg-[#F5F1E8] border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-xs text-gray-600 tracking-wider mb-1">TOTAL ROOMS</p>
            <p className="text-2xl text-[#1B4332] font-light">{rooms.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 tracking-wider mb-1">ACTIVE</p>
            <p className="text-2xl text-green-600 font-light">
              {rooms.filter(r => r.status === 'active').length}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 tracking-wider mb-1">MAINTENANCE</p>
            <p className="text-2xl text-orange-600 font-light">
              {rooms.filter(r => r.status === 'maintenance').length}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 tracking-wider mb-1">DISABLED</p>
            <p className="text-2xl text-red-600 font-light">
              {rooms.filter(r => r.status === 'disabled').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
