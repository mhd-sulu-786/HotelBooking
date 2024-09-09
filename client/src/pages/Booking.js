import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import Calendar from 'react-calendar';
import RoomGuestSelector from './RoomGuestSelector';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css';
import './Book.css';
import axios from 'axios';

const Book = () => {
  // Extract hotel details from location state
  const location = useLocation();
  const { hotelName, hotelAddress, hotelPrice } = location.state || {};
  const navigate=useNavigate();
  // State variables
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1))); // Set endDate to 1 day after startDate
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '' });
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectingStartDate, setSelectingStartDate] = useState(true);
  const [rooms, setRooms] = useState([{ id: 1, guests: 1 }]);
  const [showRoomGuestSelector, setShowRoomGuestSelector] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);

  // Retrieve user data from localStorage
  const userToken = localStorage.getItem('MyUser');
  const user = userToken ? JSON.parse(userToken) : null;

  // Effect to update total and payable amounts whenever room or date details change
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

  // Handle date selection and validation
  const handleDateChange = (selectedDate) => {
    if (selectingStartDate) {
      if (selectedDate >= endDate) {
        const newEndDate = new Date(selectedDate);
        newEndDate.setDate(newEndDate.getDate() + 1); // Add one day to the end date
        setEndDate(newEndDate);
      }
      setStartDate(selectedDate);
    } else {
      if (selectedDate <= startDate) {
        alert('End date must be after the start date');
        return;
      }
      setEndDate(selectedDate);
    }
    setShowCalendar(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, mobile, email } = formData;

    if (!name || !mobile || !email) {
      alert('Please fill in all personal details before proceeding to payment.');
      return;
    }

    if (!user) {
      alert('User not found. Please log in.');
      return;
    }

    // Prepare booking data
    const bookingData = {
      userId: user._id,
      hotelName,
      hotelAddress,
      hotelPrice,
      startDate: startDate.toISOString(),  // Ensure dates are in ISO format
      endDate: endDate.toISOString(),      // Ensure dates are in ISO format
      rooms,
      name,
      mobile,
      email,
      totalAmount: parseFloat(totalAmount),
      discount: parseFloat(discount),
      payableAmount: parseFloat(payableAmount),
    };

    // Log the booking data to verify it's correct
    console.log('Booking Data:', bookingData);
    navigate('/mybook');
    // Validate if any field is undefined
    Object.entries(bookingData).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        console.error(`${key} is missing or invalid`);
      }
    });

    try {
      // Make the POST request
      await axios.post('http://localhost:5000/api/book', bookingData);
      alert('Booking successful');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert(`Error creating booking: ${error.response?.data?.error || error.message}`);
    }
  };

  // Render nothing if user is not logged in
  if (!user) {
    return <p>User not logged in. Please log in to proceed.</p>;
  }

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
                    onClick={() => setSelectingStartDate(true)}
                    readOnly
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="To Date"
                    value={endDate.toLocaleDateString()}
                    onClick={() => setSelectingStartDate(false)}
                    readOnly
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formRoomGuestSelector" className="form-b">
              <Form.Control
                type="text"
                value={`${rooms.length} Room${rooms.length > 1 ? 's' : ''}, ${rooms.reduce(
                  (total, room) => total + room.guests,
                  0
                )} Guest${rooms.reduce((total, room) => total + room.guests, 0) !== 1 ? 's' : ''}`}
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

      <Modal show={showCalendar} onHide={() => setShowCalendar(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Dates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Calendar
            minDate={new Date()}
            value={selectingStartDate ? startDate : endDate}
            onChange={handleDateChange}
          />
        </Modal.Body>
      </Modal>

      <RoomGuestSelector
        show={showRoomGuestSelector}
        onHide={() => setShowRoomGuestSelector(false)}
        rooms={rooms}
        setRooms={setRooms}
      />
    </Container>
  );
};

export default Book;
