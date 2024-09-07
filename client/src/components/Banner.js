import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = encodeURIComponent(searchInput.trim());

    // Show toast if search input is empty
    if (!query) {
      setShowToast(true);
      return;
    }

    // Navigate to the search page with the query string
    navigate(`/search-page?query=${query}`);
  };

  return (
    <div className="banner">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h1>Over 174,000+ hotels and homes across 35+ countries</h1>
            <Form className="d-flex mt-4" onSubmit={handleSearch}>
              <Form.Control
                type="text"
                placeholder="Search by city, state, or hotel name"
                className="me-2"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button variant="primary" type="submit" className="btn-small">
                Search
              </Button>
            </Form>
          </Col>
        </Row>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
          }}
        >
          <Toast.Body>Please enter a city or state.</Toast.Body>
        </Toast>
      </Container>
    </div>
  );
};

export default Banner;
