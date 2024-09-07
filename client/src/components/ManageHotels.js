import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleImageSlider from "react-simple-image-slider";
import './admin.css';
import { FaWifi, FaWineBottle, FaWineGlass, FaWineGlassAlt, FaYelp, FaYammer, FaYandex, FaYandexInternational, FaYoutube, FaYoutubeSquare, FaTv, FaPlug, FaShower, FaDog, FaUtensils, FaConciergeBell, FaShieldAlt, FaParking, FaSuitcaseRolling, FaBroom, FaFireExtinguisher, FaFirstAid } from 'react-icons/fa';

const citiesByState = {
    Bangalore: ["Koramangala", "MG Road", "Rajajinagar", "Indiranagar", "Jayanagar"],
    Chennai: ["Tnagar", "Koyambedu", "Ramapuram", "Porur", "Annanagar"],
    Kerala: ["Palakkad", "Thrissur", "Guruvayoor", "Kochi", "Kozhikode"],
    Mumbai: ["Andheri East", "Andheri West", "Bandra", "Colaba", "Saki Naka"],
    Karnataka: ["Koramangala", "Indiranagar", "Whitefield", "Vijayanagar", "Bejai"],
    Pune: ["Viman Nagar", "Wakad", "Kharadi", "Baner"],
    Delhi: ["Saket", "Mahipalpur", "Lajpat Nagar", "Rohini", "Dwarka"]
};

const amenitiesList = [
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
    { name: 'Geyser', icon: <FaShower /> },
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

const ManageHotels = () => {
    const [form, setForm] = useState({
        name: '',
        flatno: '',
        address: '',
        description: '',
        images: [],
        categories: [],
        facilities: [],
        collections: [],
        amenities: [],
        city: '',
        state: '',
         price: ''
    });
    const [hotels, setHotels] = useState([]);
    const [imageFields, setImageFields] = useState([0]);
    const [editingHotel, setEditingHotel] = useState(null);

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/hotels'); // Ensure port and endpoint are correct
            setHotels(response.data); // Set hotels data to state
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleCheckboxChange = (e, type) => {
        const { value, checked } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [type]: checked
                ? [...prevForm[type], value]
                : prevForm[type].filter(item => item !== value)
        }));
    };

    const handleImageChange = (e) => {
        setForm(prevForm => ({ ...prevForm, images: [...prevForm.images, ...Array.from(e.target.files)] }));
    };

    const addImageField = () => {
        setImageFields(prevFields => [...prevFields, prevFields.length]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach(key => {
            if (key === 'images') {
                form.images.forEach(image => {
                    formData.append('images', image);
                });
            } else {
                formData.append(key, form[key]);
            }
        });

        try {
            if (editingHotel) {
                await axios.put(`http://localhost:5000/api/hotels/${editingHotel._id}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/hotels', formData);
            }
            fetchHotels();
            setForm({
                name: '',
                flatno: '',
                address: '',
                description: '',
                images: [],
                categories: [],
                facilities: [],
                collections: [],
                amenities: [],
                city: '',
                state: '',
                price: ''
            });
            setEditingHotel(null);
        } catch (error) {
            console.error('Error saving hotel:', error);
        }
    };

    const handleEdit = (hotel) => {
        setForm(hotel);
        setEditingHotel(hotel);
    };

    const deleteHotel = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/hotels/${id}`);
            fetchHotels();
        } catch (error) {
            console.error('Error deleting hotel:', error);
        }
    };


    const handleStateChange = (e) => {
        const { value } = e.target;
        setForm(prevForm => ({ ...prevForm, state: value, city: '' }));
    };


    
    return (
        <div className="manage-hotels">
            <h1>Manage Hotels</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Hotel Name" required />
                <input type="text" name="flatno" value={form.flatno} onChange={handleChange} placeholder="Flat No" required />
                <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Address" required />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Hotel Description" required></textarea>

                {imageFields.map((field, index) => (
                    <input key={index} type="file" name="images" multiple onChange={handleImageChange} />
                ))}

                {imageFields.length < 4 && (
                    <button type="button" onClick={addImageField}>
                        Add More Images
                    </button>
                )}

                <div className="checkbox-group">
                    <h3>Categories</h3>
                    {["OHOBO rooms - super affordable stays with essential amenities.", "premium - Hotel at premium location & premium amenities", "Townhouse - your friendly premium neighborhood hotel", "flagship - affordable hotel at premium location", "home - villas and apartment with extra space and privacy", "silverkey - executive apartments with stylish interior"].map(category => (
                        <label key={category}>
                            <input
                                type="checkbox"
                                value={category}
                                checked={form.categories.includes(category)}
                                onChange={(e) => handleCheckboxChange(e, 'categories')}
                            />
                            {category}
                        </label>
                    ))}
                </div>

                <div className="checkbox-group">
                    <h3>Facilities</h3>
                    {["Seating Area", "Balcony", "AC", "Full-sized Bed", "King-sized Bed", "Queen-sized Bed", "Room Heater", "Mini Fridge", "TV", "Hairdryer"].map(facility => (
                        <label key={facility}>
                            <input
                                type="checkbox"
                                value={facility}
                                checked={form.facilities.includes(facility)}
                                onChange={(e) => handleCheckboxChange(e, 'facilities')}
                            />
                            {facility}
                        </label>
                    ))}
                </div>

                <div className="checkbox-group">
                    <h3>Collections</h3>
                    {["Family OHOBOS", "For Group Travels", "Local ID's Accepted","OHOBO welcome Couples", "Near metrostation", "Near Railwaystation","Business Travels"].map(collection => (
                        <label key={collection}>
                            <input
                                type="checkbox"
                                value={collection}
                                checked={form.collections.includes(collection)}
                                onChange={(e) => handleCheckboxChange(e, 'collections')}
                            />
                            {collection}
                        </label>
                    ))}
                </div>

                <div className="amenities-grid">
                <h3>Amenities</h3>
    {amenitiesList.map(amenity => (
        <div key={amenity.name} className="amenity-item">
            <input
                type="checkbox"
                value={amenity.name}
                checked={form.amenities.includes(amenity.name)}
                onChange={(e) => handleCheckboxChange(e, 'amenities')}
            />
            {amenity.icon} {amenity.name}
        </div>
    ))}
</div>


                <select name="state" value={form.state} onChange={handleStateChange} required>
                    <option value="">Select State</option>
                    {Object.keys(citiesByState).map(state => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>

                {form.state && (
                    <select name="city" value={form.city} onChange={handleChange} required>
                        <option value="">Select City</option>
                        {citiesByState[form.state].map(city => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                )}
<input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required /> {/* New input for price */}

                <button type="submit">Add Hotel</button>
            </form>
            <div className="hotel-list">
                {hotels.map(hotel => (
                    <div key={hotel._id} className="hotel-card">
                        <div className="hotel-images">
                            <SimpleImageSlider
                                width={300}
                                height={300}
                                images={hotel.images.map(image => ({ url: `http://localhost:5000/uploads/${image}` }))}
                                showBullets={true}
                                showNavs={true}
                            />
                        </div>
                        <h3>{hotel.name}</h3>
                        <p><strong>Flat No:</strong> {hotel.flatno}</p>
                        <p><strong>Address:</strong> {hotel.address}</p>
                        <p><strong>Description:</strong> {hotel.description}</p>
                        <p><strong>Categories:</strong> {hotel.categories.join(', ')}</p>
                        <p><strong>Facilities:</strong> {hotel.facilities.join(', ')}</p>
                        <p><strong>Collections:</strong> {hotel.collections.join(', ')}</p>
                        <p><strong>Amenities:</strong> {hotel.amenities.join(', ')}</p>
                        <p><strong>State:</strong> {hotel.state}</p>
                        <p><strong>City:</strong> {hotel.city}</p>
                        <p><strong>Price: </strong><span className="hotel-price">₹{hotel.price}</span></p>
                        <button className="edit-button" onClick={() => handleEdit(hotel)}>Edit</button>
                        <button className="delete-button" onClick={() => deleteHotel(hotel._id)}>Delete</button>


                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageHotels;
