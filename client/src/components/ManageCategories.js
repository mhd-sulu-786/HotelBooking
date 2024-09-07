import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './admin.css'; // Import the CSS file

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const addCategory = async () => {
    try {
      await axios.post('http://localhost:5000/categories', { name, description });
      fetchCategories();
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding category', error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  return (
    <div className="manage-categories-container">
      <h1>Manage Categories</h1>
      <div className="input-container">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={addCategory}>Add Category</button>
      </div>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category._id} className="category-item">
            <input type="checkbox" />
            <span>{category.name} - {category.description}</span>
            <button onClick={() => deleteCategory(category._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCategories;
