import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './admin.css'; // Import CSS file

const ManageFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/facilities');
      setFacilities(response.data);
    } catch (error) {
      console.error('Error fetching facilities', error);
    }
  };

  const addFacility = async () => {
    try {
      await axios.post('http://localhost:5000/facilities', { name });
      fetchFacilities();
      setName('');
    } catch (error) {
      console.error('Error adding facility', error);
    }
  };

  const deleteFacility = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/facilities/${id}`);
      fetchFacilities();
    } catch (error) {
      console.error('Error deleting facility', error);
    }
  };

  return (
    <div className="manage-facilities-container">
      <h1>Manage Facilities</h1>
      <div className="input-container">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Facility Name"
        />
        <button onClick={addFacility}>Add Facility</button>
      </div>
      <div className="facility-list">
        {facilities.map((facility) => (
          <div key={facility._id} className="facility-item">
            <input type="checkbox" />
            <span>{facility.name}</span>
            <button onClick={() => deleteFacility(facility._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageFacilities;
