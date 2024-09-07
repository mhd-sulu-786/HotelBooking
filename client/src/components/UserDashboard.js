import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, Container, NavDropdown, Row, Col, Form, Button } from 'react-bootstrap';
import { FaUser, FaBriefcase, FaBuilding, FaPhone, FaGlobe, FaTwitter, FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';
import logo from '../Assets/logo.png';
import hotel from '../Assets/hotel.png';
import hotel2 from '../Assets/hotel2.png';
import flameIcon from '../Assets/flameicon.png';
import mapImage from '../Assets/mapimage.png';
import './dashboard.css';
import Banner from './Banner';

const UserDashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarVisible(false);
    }
  };

  useEffect(() => {
    if (sidebarVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarVisible]);



  return (
    <div className="user-dashboard">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home" onClick={toggleSidebar}>
            <img
              src={logo}
              width="100"
              height="70"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
          <Nav className="ml-auto d-flex align-items-center">
          <Nav.Link href="/become-member" className="text-center mx-3">
           <FaUser size={24} />
              <div>Become a Member</div>
              <div className="nav-subtext">Additional 10% off on stays</div>
            </Nav.Link>
            <Nav.Link href="/travel-det" className="text-center mx-3">
              <FaBriefcase size={24} />
              <div>OHOBO for Business</div>
              <div className="nav-subtext">Trusted by 5000 Corporates</div>
            </Nav.Link>
            <Nav.Link href="#property" className="text-center mx-3">
              <FaBuilding size={24} />
              <div>List your property</div>
              <div className="nav-subtext">Start earning in 30 mins</div>
            </Nav.Link>
            <Nav.Link href="tel:01246201611" className="text-center mx-3">
              <FaPhone size={24} />
              <div>0124-6201611</div>
              <div className="nav-subtext">call us to book now</div>
            </Nav.Link>
            <Nav.Link href="#language" className="text-center mx-3">
              <FaGlobe size={24} />
              <div>English</div>
            </Nav.Link>
            <Dropdown className="text-center mx-3">
            <Dropdown.Toggle variant="link" id="account-dropdown">
              <FaUser size={24} />
              <div>Account</div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/mybook">Booking</Dropdown.Item>

              <Dropdown.Item href="#wishlist">Wishlist</Dropdown.Item>
              <Dropdown.Item href="#settings">Help center</Dropdown.Item>
              <Dropdown.Item href="#logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Nav>
        </Container>
      </Navbar>

   

      <Container className="mt-4">
        <Nav className="justify-content-center">
          <NavDropdown title="Bangalore" id="bangalore-nav-dropdown" className="text-center mx-3">
            <NavDropdown.Item href="#bangalore/action1">Popular Localities</NavDropdown.Item>
            <NavDropdown.Item href="#bangalore/action2">Koramangala</NavDropdown.Item>
            <NavDropdown.Item href="#bangalore/action2">MG Road</NavDropdown.Item>
            <NavDropdown.Item href="#bangalore/action2">Rajajinagar</NavDropdown.Item>
            <NavDropdown.Item href="#bangalore/action2">Indiranagar</NavDropdown.Item>
            <NavDropdown.Item href="#bangalore/action2">jayanagar</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Chennai" id="chennai-nav-dropdown" className="text-center mx-3">
            <NavDropdown.Item href="#chennai/action1">Popular Localities</NavDropdown.Item>
            <NavDropdown.Item href="#chennai/action2">Tnagar</NavDropdown.Item>
            <NavDropdown.Item href="#chennai/action2">Koyammedu</NavDropdown.Item>
            <NavDropdown.Item href="#chennai/action2">Ramapuram</NavDropdown.Item>
            <NavDropdown.Item href="#chennai/action2">porur</NavDropdown.Item>
            <NavDropdown.Item href="#chennai/action2">Annanagar</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Kerala" id="kerala-nav-dropdown" className="text-center mx-3">
            <NavDropdown.Item href="#kerala/action1">Popular Localities</NavDropdown.Item>
            <NavDropdown.Item href="#kerala/action2">palakkad</NavDropdown.Item>
            <NavDropdown.Item href="#kerala/action2">Thrissur</NavDropdown.Item>
            <NavDropdown.Item href="#kerala/action2">Guruvayoor</NavDropdown.Item>
            <NavDropdown.Item href="#kerala/action2">kochi</NavDropdown.Item>
            <NavDropdown.Item href="#kerala/action2">kozhikode</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Mumbai" id="mumbai-nav-dropdown" className="text-center mx-3">
            <NavDropdown.Item href="#mumbai/action1">Popular Localities</NavDropdown.Item>
            <NavDropdown.Item href="#mumbai/action2">Antheri east</NavDropdown.Item>
            <NavDropdown.Item href="#mumbai/action2">Antheri west</NavDropdown.Item>
            <NavDropdown.Item href="#mumbai/action2">bandra</NavDropdown.Item>
            <NavDropdown.Item href="#mumbai/action2">colaba</NavDropdown.Item>
            <NavDropdown.Item href="#mumbai/action2">saki naka</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Karnataka" id="karnataka-nav-dropdown" className="text-center mx-3">
            <NavDropdown.Item href="#karnataka/action1">Popular Localities</NavDropdown.Item>
            <NavDropdown.Item href="#karnataka/action2">Koramangala</NavDropdown.Item>
            <NavDropdown.Item href="#karnataka/action2">Indiranagar</NavDropdown.Item>
            <NavDropdown.Item href="#karnataka/action2">Whitefield</NavDropdown.Item>
            <NavDropdown.Item href="#karnataka/action2">Vijayanagar</NavDropdown.Item>
            <NavDropdown.Item href="#karnataka/action2">Bejai</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Pune" id="pune-nav-dropdown" className="text-center mx-3">
            <NavDropdown.Item href="#pune/action1">Popular Localities</NavDropdown.Item>
            <NavDropdown.Item href="#pune/action2">viman nagar</NavDropdown.Item>
            <NavDropdown.Item href="#pune/action2">vakad</NavDropdown.Item>
            <NavDropdown.Item href="#pune/action2">Kharadi</NavDropdown.Item>
            <NavDropdown.Item href="#pune/action2">Baner</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Delhi" id="delhi-nav-dropdown" className="text-center mx-3">
            <NavDropdown.Item href="#delhi/action1">Popular Localities</NavDropdown.Item>
            <NavDropdown.Item href="#delhi/action2">Saket</NavDropdown.Item>
            <NavDropdown.Item href="#delhi/action2">Mahipalpur</NavDropdown.Item>
            <NavDropdown.Item href="#delhi/action2">Lajpat nagar</NavDropdown.Item>
            <NavDropdown.Item href="#delhi/action2">rohini</NavDropdown.Item>
            <NavDropdown.Item href="#delhi/action2">dwaraka</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/all-cities" className="text-center mx-3">
  All Cities
</Nav.Link>

        </Nav>
      </Container>

      <Banner />

      <Container className="image-section mt-4">
        <Row>
          <Col md={12}>
            <img src={hotel} alt="Hotel" className="img-fluid custom-image1" />
          </Col>
          <Col md={12} className="mt-4">
            <img src={hotel2} alt="Hotel 2" className="img-fluid custom-image" />
          </Col>
        </Row>
      </Container>

      <Container className="text-center mt-4">
        <Row className="align-items-center justify-content-center">
          <Col md={12} className="d-flex flex-column align-items-center">
            <div className="d-flex align-items-center justify-content-center">
              <img src={flameIcon} alt="flame icon" className="flame-icon mr-2" />
              <div className="text-center">
                <h2 className="mb-0">Get access to exclusive deals</h2>
                <p className="mb-0">Only the best deals reach your inbox</p>
              </div>
            </div>
            <Form className="justify-content-center mt-3 d-flex">
              <Form.Control type="email" placeholder="e.g., john@email.com" className="mr-sm-2" />
              <Button variant="danger">Notify me</Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container className="map-section text-center mt-4">
        <div className="world-map">
          <img src={mapImage} alt="world map" className="img-fluid custom-map" />
        </div>
        <div className="custom-list">
          <h3>There's an OHOBO around. Always.</h3>
          <p>More Destinations. More Ease. More Affordable.</p>
          <h4>20+ States / 14,000+  Hotels & Homes</h4>
          <ul className="country-list">
            <li><span className="dot green"></span> BANGLORE</li>
            <li><span className="dot red"></span> CHENNAI</li>
            <li><span className="dot blue"></span> HYDRABAD</li>
            <li><span className="dot pink"></span> DELHI</li>
            <li><span className="dot orange"></span> GOA</li>
            <li><span className="dot purple"></span> KOLKATA</li>
          </ul>
        </div>
      </Container>

      <Container className="footer mt-5">
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
            <p><FaPhone className="contact-info-icon" /> 999-888-7770</p>
            <p><FaEnvelope className="contact-info-icon" /> talkytech09@gmail.com</p>
          </div>
        </Col>
        <Col md={4} className="newsletter">
          <h3>GET OUR NEWSLETTER</h3>
          <Form inline className="newsletter-form">
            <Form.Control type="email" placeholder="e.g., john@email.com" className="mr-sm-2" />
            <Button variant="danger">Subscribe</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
    );
};

export default UserDashboard;
