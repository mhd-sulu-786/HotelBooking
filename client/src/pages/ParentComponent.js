import React, { useState, useEffect } from 'react';
import Cart from './Cart';

// Simulated function to get the current user ID
const getCurrentUserId = async () => {
  // Simulate an API call or some logic to get the user ID
  return 'exampleUserId'; // Replace with actual user ID logic
};

const ParentComponent = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const fetchedUserId = await getCurrentUserId();
      setUserId(fetchedUserId);
    };

    fetchUserId();
  }, []);

  if (userId === null) {
    return <p>Loading...</p>; // Handle loading state or provide default UI
  }

  return <Cart userId={userId} />;
};

export default ParentComponent;
