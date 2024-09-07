import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import './book.css';

const MyBook = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch user data from local storage
    const user = JSON.parse(localStorage.getItem('MyUser'));
    console.log('Fetched user:', user); // Debugging line
    if (user) {
      // Fetch bookings for the logged-in user
      const userBookings = JSON.parse(localStorage.getItem(user.email)) || [];
      console.log('Fetched bookings:', userBookings); // Debugging line
      setBookings(userBookings);
    } else {
      // Handle case where user is not found
      alert('User not found. Please log in.');
    }
  }, []);
  

  return (
    <Container className="my-book-container mt-4">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking, index) => (
          <Card key={index} className="booking-card mb-3 p-3">
            <Card.Body>
              <Card.Title>{booking.hotelName}</Card.Title>
              <Card.Text><strong>Address:</strong> {booking.hotelAddress}</Card.Text>
              <Card.Text><strong>Check-in Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</Card.Text>
              <Card.Text><strong>Check-out Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default MyBook;
