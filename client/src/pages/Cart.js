// import React, { useState, useEffect } from 'react';
// import { Container, Button, Alert } from 'react-bootstrap';
// import { FaTimes } from 'react-icons/fa';
// import './cart.css';

// const Cart = ({ userId }) => {
//   const [hotels, setHotels] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!userId) {
//       setError('User ID is not defined.');
//       console.log('User ID is undefined');
//       return;
//     }

//     const fetchHotels = async () => {
//       try {
//         const storedCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
//         console.log('Stored carts:', storedCarts); // Log stored carts

//         const userCart = storedCarts[userId] || [];
//         console.log('User cart data:', userCart); // Log user cart data

//         if (userCart.length === 0) {
//           setHotels([]);
//           return;
//         }

//         const detailedHotels = await Promise.all(userCart.map(async (hotelId) => {
//           const detailedHotel = await fetchHotelDetails(hotelId);
//           return detailedHotel || { id: hotelId }; // Use fallback if fetch fails
//         }));

//         console.log('Detailed hotels:', detailedHotels); // Log detailed hotels
//         setHotels(detailedHotels);
//       } catch (err) {
//         setError('Failed to retrieve cart data.');
//         console.error('Error retrieving cart:', err);
//       }
//     };

//     fetchHotels();
//   }, [userId]);

//   const fetchHotelDetails = async (hotelId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/hotels/${hotelId}`);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       return data;
//     } catch (err) {
//       console.error('Error fetching hotel details:', err);
//       setError('Failed to fetch hotel details.');
//       return { id: hotelId }; // Return an object with the hotelId for display
//     }
//   };
  
//   const handleBookNow = async () => {
//     try {
//       console.log('Booking hotels:', hotels);
//       alert('Booking functionality is not implemented yet.');
//     } catch (err) {
//       setError('Failed to book hotels.');
//       console.error('Error booking hotels:', err);
//     }
//   };

//   const handleCancel = (hotelToRemove) => {
//     try {
//       const updatedHotels = hotels.filter(hotel => hotel.id !== hotelToRemove.id);
//       setHotels(updatedHotels);

//       const storedCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
//       storedCarts[userId] = updatedHotels.map(hotel => hotel.id); // Save only hotel IDs
//       localStorage.setItem('userCarts', JSON.stringify(storedCarts));

//       console.log('Updated carts:', storedCarts); // Log updated carts
//     } catch (err) {
//       setError('Failed to remove hotel from cart.');
//       console.error('Error removing hotel:', err);
//     }
//   };

//   if (error) {
//     return <Alert variant="danger">{error}</Alert>;
//   }

//   if (!hotels.length) {
//     return <p>No hotels in cart.</p>;
//   }

//   return (
//     <Container className="cart-container mt-5">
//       <div className="cart-table">
//         {hotels.map((hotel) => (
//           <div key={hotel.id} className="cart-row">
//             <div className="cart-cell">
//               <img src={`http://localhost:5000/uploads/${hotel.images ? hotel.images[0] : 'default.jpg'}`} alt={hotel.name} />
//             </div>
//             <div className="cart-cell hotel-name">{hotel.name || 'Unknown Hotel'}</div>
//             <div className="cart-cell price">₹{hotel.price || 'N/A'}</div>
//             <div className="cart-cell buttons">
//               <Button variant="success" className="btn-small" onClick={handleBookNow}>Book Now</Button>
//               <Button className="custom-yellow-button btn-small ml-3" onClick={() => handleCancel(hotel)}>
//                 <FaTimes /> Cancel
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default Cart;
