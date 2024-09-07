import React from 'react';
import './room.css'; // Ensure this file contains the required CSS for styling

const RoomGuestSelector = ({ rooms, setRooms, handleClose }) => {
  const addRoom = () => {
    setRooms([...rooms, { id: rooms.length + 1, guests: 1 }]);
  };

  const deleteRoom = () => {
    if (rooms.length > 1) {
      setRooms(rooms.slice(0, -1));
    }
  };

  const updateGuests = (id, increment) => {
    setRooms(
      rooms.map(room =>
        room.id === id
          ? { ...room, guests: Math.max(1, Math.min(3, room.guests + increment)) }
          : room
      )
    );
  };

  const totalGuests = rooms.reduce((total, room) => total + room.guests, 0);

  return (
    <div className="room-guest-selector">
      <div className="header">
        {/* Display total number of rooms and guests */}
        <input
          type="text"
          value={`${rooms.length} Room${rooms.length > 1 ? 's' : ''}, ${totalGuests} Guest${totalGuests !== 1 ? 's' : ''}`}
          readOnly
          className="placeholder-view"
        />
      </div>

      <div className="rooms-list">
        {rooms.map((room, index) => (
          <div key={room.id} className="room">
            <div className="room-info">
              <span>Room {index + 1}</span>
              <div className="guest-control">
                <button onClick={() => updateGuests(room.id, -1)} disabled={room.guests <= 1}>-</button>
                <input type="text" value={room.guests} readOnly />
                <button onClick={() => updateGuests(room.id, 1)} disabled={room.guests >= 3}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="room-controls">
        <button onClick={deleteRoom} disabled={rooms.length <= 1}>Delete Room</button>
        <button onClick={addRoom}>Add Room</button>
      </div>

      <div className="modal-footer">
        <button onClick={handleClose} className="close-button">Close</button>
        <button onClick={handleClose} className="done-button">Done</button>
      </div>
    </div>
  );
};

export default RoomGuestSelector;
