import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { FaUser, FaPhone } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import SimpleImageSlider from 'react-simple-image-slider';
import './main.css';

const SearchPage = () => {
  const [hotels, setHotels] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({ minPrice: 400, maxPrice: 3000 });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const query = new URLSearchParams(location.search).get('query') || '';
        const response = await axios.get('http://localhost:5000/api/hotels', {
          params: { query }
        });

        // Filter hotels based on city, state, and price range
        const filteredHotels = response.data.filter(hotel =>
          (hotel.city.toLowerCase().includes(query.toLowerCase()) ||
           hotel.state.toLowerCase().includes(query.toLowerCase())) &&
          hotel.price >= filters.minPrice &&
          hotel.price <= filters.maxPrice
        );

        setHotels(filteredHotels);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, [location.search, filters]);

  const handleSearch = () => {
    navigate(`/search-page?query=${searchInput}`);
  };

  const handleViewMore = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const handleBooking = (hotel) => {
    navigate('/book', { state: { hotelId: hotel._id, hotelName: hotel.name, hotelAddress: `${hotel.flatno}, ${hotel.address}, ${hotel.city}, ${hotel.state}`, hotelPrice: hotel.price } });
  };

  return (
    <div className="main-container1">
      <Navbar className="navbar1" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="ohobo-brand">OHOBO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="search-form-container">
              <Form className="d-flex search-form" onSubmit={(e) => e.preventDefault()}>
                <FormControl
                  type="search"
                  placeholder="Search by city or state"
                  className="search-input"
                  aria-label="Search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <Button variant="outline-success" className="search-button" onClick={handleSearch}>Search</Button>
              </Form>
            </div>
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
      <Sidebar onFilterChange={handleFilterChange} />
      <div className="search-results">
        {hotels.length > 0 ? (
          hotels.map(hotel => (
            <div key={hotel._id} className="hotel-card1">
              <div className="hotel-card-content1">
                <div className="hotel-image1">
                  {hotel.images && hotel.images.length > 0 ? (
                    <SimpleImageSlider
                      images={hotel.images.map(image => ({ url: `http://localhost:5000/uploads/${image}` }))}
                      width={390}
                      height={350}
                      showBullets={true}
                      showNavs={true}
                    />
                  ) : (
                    <img src="/path/to/placeholder-image.png" alt="No images available" className="placeholder-image" />
                  )}
                </div>
                <div className="hotel-details1">
                  <h2>{hotel.name}</h2>
                  <p><strong>{hotel.flatno}, {hotel.address}, {hotel.city}, {hotel.state}</strong></p>
                  <p><strong>{hotel.description}</strong></p>
                  <h3 className="hotel-price"><strong>Price:</strong> ₹{hotel.price}</h3>
                  <div className="hotel-buttons">
                    <Button className="btn-light-custom" onClick={() => handleViewMore(hotel._id)}>VIEW DETAILS</Button>
                    <Button variant="success" className="booking btn-small" onClick={() => handleBooking(hotel)}>BOOK NOW</Button>

                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
