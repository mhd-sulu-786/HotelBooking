import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import sampleImage from '../Assets/images/graph.png';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <div className="sidebar2">
                <div className="sidebar2-header">
                    <h2><strong>OHOBO</strong></h2>
                </div>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/categories">Manage Categories</Link></li>
                    <li><Link to="/facilities">Manage Facilities</Link></li>
                    <li><Link to="/collections">Manage Collections</Link></li>
                    <li><Link to="/states"> Amenties</Link></li>
                    <li><Link to="/hotels">Manage Hotels</Link></li>
                    <li><Link to="/users">Manage Users</Link></li>
                </ul>
            </div>
            <div className="main-content">
                <h1>Admin Dashboard</h1>
                <p>Summary of your App</p>
                <div className="cards2">
                    <div className="card2">
                        <h3>8,457</h3>
                        <p>Daily Visits</p>
                    </div>
                    <div className="card2">
                        <h3>52,160</h3>
                        <p>Sales</p>
                    </div>
                    <div className="card2">
                        <h3>15,823</h3>
                        <p>Comments</p>
                    </div>
                    <div className="card2">
                        <h3>36,752</h3>
                        <p>No. of Visits</p>
                    </div>
                </div>
                <div className="image-container">
                    <img src={sampleImage} alt="Dashboard Overview" />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
