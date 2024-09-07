import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './admin.css'; // Import CSS file

const ManageHotelCollections = () => {
  const [collections, setCollections] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get('http://localhost:5000/collections');
      setCollections(response.data);
    } catch (error) {
      console.error('Error fetching collections', error);
    }
  };

  const addCollection = async () => {
    try {
      await axios.post('http://localhost:5000/collections', { name });
      fetchCollections();
      setName('');
    } catch (error) {
      console.error('Error adding collection', error);
    }
  };

  const deleteCollection = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/collections/${id}`);
      fetchCollections();
    } catch (error) {
      console.error('Error deleting collection', error);
    }
  };

  return (
    <div className="manage-collections-container">
      <h1>Manage Collections</h1>
      <div className="input-container">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Collection Name"
        />
        <button onClick={addCollection}>Add Collection</button>
      </div>
      <div className="collection-list">
        {collections.map((collection) => (
          <div key={collection._id} className="collection-item">
            <input type="checkbox" />
            <span>{collection.name}</span>
            <button onClick={() => deleteCollection(collection._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageHotelCollections;
