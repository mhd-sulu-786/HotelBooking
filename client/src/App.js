import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import BecomeMember from './components/BecomeMember';
import OravelTravel from './components/OravelTravel';
import AllCities from './components/AllCities';
import ManageCategories from './components/ManageCategories';
import ManageFacilities from './components/ManageFacilities';
import ManageHotelCollections from './components/ManageHotelCollections';
import Amenities from './components/Amenities';
import ManageHotels from './components/ManageHotels';
import SearchPage from './pages/mainpage';
import HotelDetailPage from './pages/HotelDetailPage';
import ParentComponent from './pages/ParentComponent';
import Booking from './pages/Booking';
import ManageUsers from './components/Manageusers';
import MyBook from './components/MyBook';
function App() {
  const updateUser = (userData) => {
    // You can add functionality here later if needed
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login setUser={updateUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/categories" element={<ManageCategories />} />
        <Route path="/facilities" element={<ManageFacilities />} /> 
        <Route path="/collections" element={<ManageHotelCollections />} />
        <Route path="/hotels" element={<ManageHotels />} />
        <Route path="/states" element={<Amenities />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/search-page" element={<SearchPage />} /> 
        <Route path="/hotel/:id" element={<HotelDetailPage />} />
        <Route path="/cart" element={<ParentComponent />} /> 
        <Route path="/become-member" element={<BecomeMember />} />
        <Route path="/travel-det" element={<OravelTravel />} />
        <Route path="/all-cities" element={<AllCities />} />
        <Route path="/book" element={<Booking />} />
        <Route path="/mybook" element={<MyBook />} />
        <Route path="/users" element={<ManageUsers />} /> 
      </Routes>
    </Router>
  );
}

export default App;
