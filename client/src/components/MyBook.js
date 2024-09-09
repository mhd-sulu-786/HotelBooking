import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import './book.css';

const MyBook = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('MyUser'));
  
    if (user) {
      axios
        .get(`http://localhost:5000/data/users/${user._id}/bookings`)  // Ensure endpoint is correct
        .then((response) => {
          setBookings(response.data.bookings);
        })
        .catch((error) => {
          console.error('Error fetching bookings:', error);
          setError('Failed to fetch bookings');
        });
    } else {
      setError('User not found. Please log in.');
    }
  }, []);
  

  return (
    <Container className="my-book-container mt-4">
      <h2>My Bookings</h2>
      {error ? (
        <p>{error}</p>
      ) : bookings.length === 0 ? (
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
}  

export default MyBook;
