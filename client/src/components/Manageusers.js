import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './ManageUsers.css';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/api/users');
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/users/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="manage-users">
            <h1>Manage Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Profile Image</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td><img src={`http://localhost:5000${user.profileImage}`} alt="Profile" /></td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
