import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import Calendar from 'react-calendar';
import RoomGuestSelector from './RoomGuestSelector';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css';
import './Book.css';
import axios from 'axios';

const Book = () => {
  const location = useLocation();
  const { hotelName, hotelAddress, hotelPrice } = location.state || {};

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectingStartDate, setSelectingStartDate] = useState(true);
  const [rooms, setRooms] = useState([{ id: 1, guests: 1 }]);
  const [showRoomGuestSelector, setShowRoomGuestSelector] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);

  const userToken = localStorage.getItem('MyUser');
  const user = userToken ? JSON.parse(userToken) : null; // Ensure correct parsing

  useEffect(() => {
    if (!user) {
      alert('No user data found in local storage.');
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.mobile || !formData.email) {
      alert('Please fill in all personal details before proceeding to payment.');
      return;
    }

    if (!user) {
      alert('User not found. Please log in.');
      return;
    }

    try {
      const bookingData = {
        userId: user._id, // Use user._id if user is an object
        hotelName,
        hotelAddress,
        hotelPrice,
        startDate,
        endDate,
        rooms,
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        totalAmount: parseFloat(totalAmount),
        discount: parseFloat(discount),
        payableAmount: parseFloat(payableAmount),
      };

      await axios.post('http://localhost:5000/api/book', bookingData);
      alert('Booking successful');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking: ' + error.message);
    }
  };

  const handleDateClick = (isStartDate) => {
    setSelectingStartDate(isStartDate);
    setShowCalendar(true);
  };

  const handleCalendarClose = () => {
    setShowCalendar(false);
  };

  const handleDateChange = (selectedDate) => {
    if (selectingStartDate) {
      if (selectedDate > endDate) {
        alert('Start date cannot be later than end date');
        return;
      }
      setStartDate(selectedDate);
    } else {
      if (selectedDate < startDate) {
        alert('End date cannot be earlier than start date');
        return;
      }
      setEndDate(selectedDate);
    }
    setShowCalendar(false);
  };

  const calculateTotalAmount = useCallback(() => {
    const numberOfNights = Math.max((endDate - startDate) / (1000 * 60 * 60 * 24), 1);
    const roomCount = rooms.length;
    const roomCost = hotelPrice * roomCount * numberOfNights;
    const guestCount = rooms.reduce((total, room) => total + room.guests, 0);
    const guestSurcharge = guestCount > roomCount ? (guestCount - roomCount) * 10 * numberOfNights : 0;
    const tax = 40;
    const total = roomCost + guestSurcharge + tax;
    setTotalAmount(total.toFixed(2));
  }, [endDate, startDate, rooms, hotelPrice]);

  useEffect(() => {
    calculateTotalAmount();
  }, [calculateTotalAmount]);

  useEffect(() => {
    const discountAmount = parseFloat(totalAmount) * 0.1;
    setDiscount(discountAmount.toFixed(2));
    setPayableAmount((parseFloat(totalAmount) - discountAmount).toFixed(2));
  }, [totalAmount]);

  if (!hotelName) {
    return <p>No hotel details available.</p>;
  }

  return (
    <Container className="book-page-container mt-4">
      <Row>
        <Col md={6}>
          <Card className="carda p-4" style={{ height: '500px', width: '100%' }}>
            <h3>Enter Your Details</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first and last name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formMobile">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. 1234567890"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  pattern="\d{10}"
                  title="Please enter a valid 10-digit mobile number"
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@abc.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button type="submit">Proceed to Payment</Button>
            </Form>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="cardb p-4" style={{ height: '740px', width: '100%' }}>
            <p className="hotel-price">₹{hotelPrice}</p>
            <p className="hotel-name">{hotelName}</p>
            <p className="hotel-address">{hotelAddress}</p>

            <Form.Group controlId="formDateRange" className="form-a">
              <Form.Label>Select Your Dates:</Form.Label>
              <Row>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="From Date"
                    value={startDate.toLocaleDateString()}
                    onClick={() => handleDateClick(true)}
                    readOnly
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="To Date"
                    value={endDate.toLocaleDateString()}
                    onClick={() => handleDateClick(false)}
                    readOnly
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formRoomGuestSelector" className="form-b">
              <Form.Control
                type="text"
                value={`${rooms.length} Room${rooms.length > 1 ? 's' : ''}, ${rooms.reduce((total, room) => total + room.guests, 0)} Guest${rooms.reduce((total, room) => total + room.guests, 0) !== 1 ? 's' : ''}`}
                onClick={() => setShowRoomGuestSelector(true)}
                readOnly
              />
            </Form.Group>

            <p className="amount-details">Total Amount (including tax): ₹{totalAmount}</p>
            <p className="amount-details">Discount: ₹{discount}</p>
            <p className="amount-details payable-amount" style={{ fontSize: '24px' }}>Payable Amount: ₹{payableAmount}</p>

            <Button className="btn-payment" onClick={handleSubmit}>
              Proceed to Payment
            </Button>
          </Card>
        </Col>
      </Row>

      <Modal show={showCalendar} onHide={handleCalendarClose} centered>
        <Modal.Body>
          <Calendar
            onChange={handleDateChange}
            value={selectingStartDate ? startDate : endDate}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showRoomGuestSelector} onHide={() => setShowRoomGuestSelector(false)} centered>
        <Modal.Body>
          <RoomGuestSelector
            rooms={rooms}
            onChange={(updatedRooms) => setRooms(updatedRooms)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Book;
