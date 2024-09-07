import React, { useState, useEffect } from 'react';
import  { useParams, useNavigate }  from 'react-router-dom';
import { Navbar, Nav, Container, Button, Modal, Form, FormControl, Row, Col } from 'react-bootstrap';
import { FaPhone, FaUser, FaTwitter, FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { FaWifi, FaWineGlass, FaWineGlassAlt, FaYelp, FaYammer, FaYandex, FaYandexInternational, FaYoutube, FaYoutubeSquare, FaTv, FaPlug, FaShower, FaDog, FaUtensils, FaConciergeBell, FaShieldAlt, FaParking, FaSuitcaseRolling, FaBroom, FaFireExtinguisher, FaFirstAid } from 'react-icons/fa';
import axios from 'axios';
import SimpleImageSlider from 'react-simple-image-slider';
import RoomGuestSelector from './RoomGuestSelector';
// import { useAuth } from '../pages/AuthContext'; 
import './hotel.css';

const amenitiesList = [
  { name: 'Free Wifi', icon: <FaWifi /> },
  { name: 'Wine Bottle', icon: <FaWineGlass /> },
  { name: 'Wine Glass', icon: <FaWineGlass /> },
  { name: 'Wine Glass Alt', icon: <FaWineGlassAlt /> },
  { name: 'Yelp', icon: <FaYelp /> },
  { name: 'Yammer', icon: <FaYammer /> },
  { name: 'Yandex', icon: <FaYandex /> },
  { name: 'Yandex International', icon: <FaYandexInternational /> },
  { name: 'YouTube', icon: <FaYoutube /> },
  { name: 'YouTube Square', icon: <FaYoutubeSquare /> },
  { name: 'TV', icon: <FaTv /> },
  { name: 'Power Backup', icon: <FaPlug /> },
  { name: 'Geyser', icon: <FaShower /> },
  { name: 'Pet Friendly', icon: <FaDog /> },
  { name: 'Dining Area', icon: <FaUtensils /> },
  { name: 'Reception', icon: <FaConciergeBell /> },
  { name: 'Security', icon: <FaShieldAlt /> },
  { name: 'Free Parking', icon: <FaParking /> },
  { name: 'Luggage Assistance', icon: <FaSuitcaseRolling /> },
  { name: 'Daily Housekeeping', icon: <FaBroom /> },
  { name: 'Fire Extinguisher', icon: <FaFireExtinguisher /> },
  { name: 'First-aid Kit', icon: <FaFirstAid /> },
];

const HotelDetailPage = () => {
  const { id } = useParams();
  // const { user } = useAuth();
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showRoomGuestModal, setShowRoomGuestModal] = useState(false);

  // State for room and guest selection
  const [rooms, setRooms] = useState([{ id: 1, guests: 3 }]);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  // const fetchUser = async (userId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/auth/user/${userId}`);
  //     if (response.status === 200) {
  //       // Handle successful response
  //       console.log('User data:', response.data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user:', error.response ? error.response.data : error.message);
  //   }
  // };
  
  // // Example usage
  // fetchUser('1'); // Replace '1' with a dynamic user ID
  

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };

    if (id) {
      fetchHotel();
    }
  }, [id]);

  const handleClose = () => setShowModal(false);
  const handleCloseRoomGuestModal = () => setShowRoomGuestModal(false);
  const handleShowRoomGuestModal = () => setShowRoomGuestModal(true);


  // const handleAddToCart = () => {
  //   if (!user) {
  //     alert('You need to be logged in to add items to the cart.');
  //     return;
  //   }
  
  //   try {
  //     // Extract necessary data from the hotel object
  //     const { _id: hotelId, name: hotelName, images: hotelImage, price: hotelPrice } = hotel;
  
  //     // Get existing cart items from local storage
  //     const cart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
  
  //     // Check if the hotel is already in the cart
  //     const existingItemIndex = cart.findIndex(item => item.hotelId === hotelId);
  //     if (existingItemIndex > -1) {
  //       // Update the quantity if item already exists in cart
  //       cart[existingItemIndex].quantity += 1;
  //     } else {
  //       // Add new item to the cart
  //       cart.push({
  //         userId: user.id,
  //         hotelId,
  //         hotelName,
  //         hotelImage: hotelImage[0], // Assuming hotelImage is an array
  //         hotelPrice,
  //         quantity: 1, // Initial quantity
  //       });
  //     }
  
  //     // Save the updated cart to local storage
  //     localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
  
  //     alert('Hotel added to cart successfully!');
  //   } catch (error) {
  //     console.error('Error adding to cart:', error.response ? error.response.data : error.message);
  //     alert('Failed to add hotel to cart. ' + (error.response ? error.response.data.message : error.message));
  //   }
  // };
  

    const handleBooking = () => {
      if (!hotel) return;

      navigate('/book', { state: { 
        hotelId: hotel._id, 
        hotelName: hotel.name, 
        hotelAddress: hotel.address, 
        hotelPrice: hotel.price,
        hotelImage: hotel.images[0] 
      }});
    };
  

  const renderAmenitiesGrid = () => {
    const displayedAmenities = showAllAmenities ? amenitiesList : amenitiesList.slice(0, 4);

    return (
      <>
        {displayedAmenities.map(amenity => (
          <div key={amenity.name} className="amenity-item">
            <span className="amenity-icon">{amenity.icon}</span>
            <span className="amenity-name">{amenity.name}</span>
          </div>
        ))}
        {!showAllAmenities && amenitiesList.length > 4 && (
          <div className="view-more-item">
            <a href="#view-more-amenities" className="view-more" onClick={() => setShowAllAmenities(true)}>....View More</a>
          </div>
        )}
      </>
    );
  };

  if (!hotel) {
    return <p>Loading...</p>; // Consider a spinner or more elaborate loading indicator
  }
  const totalGuests = rooms.reduce((total, room) => total + room.guests, 0);
  return (
    <div className="main-container1">
      <Navbar className="navbar1" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="ohobo-brand">OHOBO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form className="search-form">
            <FormControl
  type="text"
  placeholder={`${rooms.length} Rooms, ${totalGuests} Guests`}
  className="search-input"
  aria-label="Rooms and Guests"
  onClick={handleShowRoomGuestModal} 
/>

             </Form>
            <Nav className="ml-auto d-flex align-items-center nav-right">
              <Nav.Link href="tel:01246201611" className="text-center mx-3">
                <FaPhone size={24} />
                <div>0124-6201611</div>
                <div className="nav-subtext">Call us to book now</div>
              </Nav.Link>
              <Nav.Link href="#login" className="text-center mx-3">
                <FaUser size={24} />
                <div>Login / Signup</div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="hotel-detail-page2">
        <div className="hotel-card-content2">
          <div className="hotel-image2">
            {hotel.images && hotel.images.length > 0 ? (
              <div className="image-slider-wrapper2">
                <SimpleImageSlider
                  images={hotel.images.map(image => ({ url: `http://localhost:5000/uploads/${image}` }))}
                  width={600}
                  height={400}
                  showBullets={true}
                  showNavs={true}
                />
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div className="hotel-details2">
            <h2>{hotel.name}</h2>
            <p><strong>{hotel.flatno}, {hotel.address}, {hotel.city}, {hotel.state}</strong></p>
            <h4 className="amentiesdet">
              <strong>Amenities:</strong>
            </h4>
            <div className="amenities-grid">
              {renderAmenitiesGrid()}
            </div>
            <h3 className="hotel-price"><strong>Price:</strong> ₹{hotel.price}</h3>
            <div className="action-buttons">
            {/* <Button variant="primary" className='add-to-cart' onClick={handleAddToCart}>Add to Cart</Button> */}
              <Button variant="success" className='booking' onClick={handleBooking}>Continue to Booking</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="hotel-policies">
        <h4><strong>Hotel Policies:</strong></h4>
        <div className="policy-item">
          <span className="policy-label">Check-in:</span>
          <span className="policy-box">12:00 PM</span>
        </div>
        <div className="policy-item">
          <span className="policy-label">Check-out:</span>
          <span className="policy-box">11:00 AM</span>
        </div>
        <ul className="policy-list">
          <li>Couples are welcome.</li>
          <li>Guests can check in using any local or outstation ID proof (PAN card not accepted).</li>
          <li>This hotel is serviced under the trade name of Hotel The Grace as per quality standards of OHOBO.</li>
        </ul>
      </div>

      {/* Modal for displaying hotel details */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{hotel.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content2">
            <div className="modal-image2">
              {hotel.images && hotel.images.length > 0 ? (
                <div className="image-slider-wrapper2">
                  <SimpleImageSlider
                    images={hotel.images.map(image => ({ url: `http://localhost:5000/uploads/${image}` }))}
                    width={600}
                    height={400}
                    showBullets={true}
                    showNavs={true}
                  />
                </div>
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div className="modal-details">
              <p><strong>{hotel.flatno}, {hotel.address}, {hotel.city}, {hotel.state}</strong></p>
              <div className="amentiesdet">
                <strong>Amenities:</strong>
                <div className="amenities-grid">
                  {renderAmenitiesGrid()}
                </div>
              </div>
              <h3 className="hotel-price"><strong>Price:</strong> ₹{hotel.price}</h3>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <div className="footer-wrapper">
        <Container className="footer2 mt-5">
          <Row>
            <Col md={4} className="diamond-jubilee">
              <h2>Diamond Jubilee</h2>
              <p>Thank You So Much Guys For Your Valuable Time</p>
              <p><strong>London, East Street - +123</strong></p>
              <div className="social-icons">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              </div>
            </Col>
            <Col md={4} className="contact-info">
              <div className="contact-details">
                <h3>Contact Info</h3>
                <p><FaPhone className="contact-info-icon" /> 999-888-7770</p>
                <p><FaEnvelope className="contact-info-icon" /> talkytech09@gmail.com</p>
              </div>
            </Col>
            <Col md={4} className="newsletter">
              <h3>GET OUR NEWSLETTER</h3>
              <Form className="newsletter-form">
                <Form.Control type="email" placeholder="e.g., john@email.com" className="mr-sm-2" />
                <Button variant="danger">Subscribe</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
 {/* Modal for room and guest selection */}
 <Modal show={showRoomGuestModal} onHide={handleCloseRoomGuestModal} size="m" centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Rooms and Guests</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RoomGuestSelector 
            rooms={rooms} 
            setRooms={setRooms} 
            handleClose={handleCloseRoomGuestModal} 
          />
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default HotelDetailPage;
