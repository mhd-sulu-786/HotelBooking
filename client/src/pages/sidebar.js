import React, { useState } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import './main.css';

const Sidebar = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(400);
  const [maxPrice, setMaxPrice] = useState(3000);

  const collections = [
    "Family OHOBOS",
    "For Group Travels",
    "Local ID's Accepted",
    "OHOBO welcomes Couples",
    "Near metrostation",
    "Near Railwaystation",
    "Business Travels"
  ];

  const categories = [
    "OHOBO rooms - super affordable stays with essential amenities.",
    "Premium - Hotel at premium location & premium amenities",
    "Townhouse - your friendly premium neighborhood hotel",
    "Flagship - affordable hotel at premium location",
    "Home - villas and apartments with extra space and privacy",
    "Silverkey - executive apartments with stylish interior"
  ];

  const facilities = [
    "Seating Area",
    "Balcony",
    "AC",
    "Full-sized Bed",
    "King-sized Bed",
    "Queen-sized Bed",
    "Room Heater",
    "Mini Fridge",
    "TV",
    "Hairdryer"
  ];

  const handlePriceChange = () => {
    onFilterChange({ minPrice, maxPrice });
  };

  return (
    <div className="sidebar">
      <div className="filter-section">
        <h5>Filters</h5>
        <a href="#clear-all" className="clear-all">Clear All</a>
      </div>

      <div className="filter-price">
        <h6>Price</h6>
        <InputGroup>
          <InputGroup.Text>₹</InputGroup.Text>
          <FormControl 
            type="number" 
            placeholder="Min" 
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            onBlur={handlePriceChange}
          />
          <InputGroup.Text>-</InputGroup.Text>
          <FormControl 
            type="number" 
            placeholder="Max" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            onBlur={handlePriceChange}
          />
        </InputGroup>
      </div>

      <div className="filter-collections">
        <h6>Collections</h6>
        {collections.map((item, index) => (
          <Form.Check key={index} type="checkbox" label={item} />
        ))}
      </div>

      <div className="filter-categories">
        <h6>Categories</h6>
        {categories.map((item, index) => (
          <Form.Check key={index} type="checkbox" label={item} />
        ))}
      </div>

      <div className="filter-facilities">
        <h6>Facilities</h6>
        {facilities.map((item, index) => (
          <Form.Check key={index} type="checkbox" label={item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
