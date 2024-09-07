import React, { useState } from 'react';
import { FaWifi, FaWineBottle, FaWineGlass, FaWineGlassAlt, FaYelp, FaYammer, FaYandex, FaYandexInternational, FaYoutube, FaYoutubeSquare, FaTv, FaPlug, FaShower, FaDog, FaUtensils, FaConciergeBell, FaShieldAlt, FaParking, FaSuitcaseRolling, FaBroom, FaFireExtinguisher, FaFirstAid  } from 'react-icons/fa';
import './admin.css';
import axios from 'axios';

const amenities = [
  { name: 'Free Wifi', icon: <FaWifi /> },
  { name: 'Wine Bottle', icon: <FaWineBottle /> },
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
  { name: 'Geyser', icon: <FaShower /> },  // or <FaThermometerHalf />
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

const Amenities = () => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [showSelected, setShowSelected] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedAmenities((prev) =>
      checked
        ? [...prev, value]
        : prev.filter((amenity) => amenity !== value)
    );
  };

  const handleSelect = () => {
    setShowSelected(true);
  };

  const handleSaveSelected = async () => {
    try {
      const amenitiesWithIcons = selectedAmenities.map(amenityName => {
        const amenity = amenities.find(a => a.name === amenityName);
        return {
          name: amenity.name,
          icon: amenity.icon ? amenity.icon.props.className : 'default-icon', // Extract icon className or use a default
        };
      });

      const response = await axios.post('http://localhost:5000/amenities', {
        amenities: amenitiesWithIcons,
      });
      console.log('Amenities saved successfully', response.data);
    } catch (error) {
      console.error('Error saving amenities', error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await axios.delete('http://localhost:5000/amenities', {
        data: { amenities: selectedAmenities },
      });
      setSelectedAmenities([]);
      setShowSelected(false);
      console.log('Amenities deleted successfully');
    } catch (error) {
      console.error('Error deleting amenities', error);
    }
  };

  return (
    <div className="amenities-container">
      <h1>Amenities</h1>
      <div className="amenities-list">
        {!showSelected && amenities.map((amenity, index) => (
          <div key={index} className="amenity-item">
            <input
              type="checkbox"
              value={amenity.name}
              onChange={handleCheckboxChange}
              checked={selectedAmenities.includes(amenity.name)}
            />
            {amenity.icon}
            <span>{amenity.name}</span>
          </div>
        ))}
        {showSelected && selectedAmenities.map((amenityName, index) => {
          const amenity = amenities.find(a => a.name === amenityName);
          return (
            <div key={index} className="amenity-item">
              {amenity?.icon}
              <span>{amenity?.name}</span>
            </div>
          );
        })}
      </div>
      <button onClick={handleSelect} className="select-button">
        Select
      </button>
      {showSelected && (
        <>
          <button onClick={handleSaveSelected} className="save-button">
            Save 
          </button>
          <button onClick={handleDeleteSelected} className="delete-button">
            Delete Selected
          </button>
        </>
      )}
    </div>
  );
};

export default Amenities;
