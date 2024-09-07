import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './dashboard.css'; // Import your CSS file for custom styles

const cities = [
  "Agra", "Ahmedabad", "Bangalore", "Bhopal", "Chennai", "Delhi", "Goa", 
  "Hyderabad", "Indore", "Jaipur", "Kolkata", "Lucknow", "Mumbai", 
  "Nagpur", "Pune", "Surat", "Udaipur", "Visakhapatnam"
];

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

const AllCities = () => {
  const [selectedLetter, setSelectedLetter] = useState('');

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  const filteredCities = selectedLetter
    ? cities.filter(city => city.startsWith(selectedLetter))
    : cities;

  return (
    <Container className="mt-4">
      <h1 className="text-center">All Cities</h1>
      <Row>
        <Col md={2} className="alphabet-column">
          {letters.map((letter, index) => (
            <Button 
              key={index} 
              variant="outline-primary" 
              className="m-1 letter-button"
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </Button>
          ))}
          <Button 
            variant="outline-secondary" 
            className="m-1 letter-button"
            onClick={() => handleLetterClick('')}
          >
            All
          </Button>
        </Col>
        <Col md={10}>
          <Row className="mt-3">
            {filteredCities.sort().map((city, index) => (
              <Col key={index} md={3} className="mb-3">
                <div className="city-card p-2 border text-center">
                  {city}
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AllCities;
