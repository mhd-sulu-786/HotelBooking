import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './style.css';

const Login = ({ setUser }) => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Sending payload:", values);

        try {
            const result = await axios.post('http://localhost:5000/auth/login', values, { withCredentials: true });
            console.log("Server response:", result);

            if (result.status === 200) {
                // Store the complete user data in localStorage
                localStorage.setItem('MyUser', JSON.stringify(result.data));

                // Redirect user based on their role
                navigate(result.data.isAdmin ? '/admin-dashboard' : '/user-dashboard');
            } else {
                setError(result.data.Error || "An unexpected error occurred.");
            }
        } catch (err) {
            console.error("Axios error:", err.response?.data || err.message);
            setError(err.response?.data?.Error || "Invalid email or password. Please try again.");
        }
    };

    return (
        <div className='loginPage'>
            <div className='infoText'>
                <h3><strong>HOBO</strong></h3>
                <p><strong>Welcome to your destiny !!</strong></p>
                <b>"Guaranteed availability as well as the ability to plan your stay better 🎉".</b>
            </div>
            <div className='loginForm'>
                {error && <p className="error-message text-warning">{error}</p>}
                <h2>LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            autoComplete='off'
                            placeholder='Enter Email'
                            value={values.email}
                            onChange={handleChange}
                            className='form-control rounded-0'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            placeholder='Enter Password'
                            value={values.password}
                            onChange={handleChange}
                            className='form-control rounded-0'
                            required
                        />
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Continue</button>
                    <div className='terms-and-conditions'>
                        <input type="checkbox" name="tick" id="tick" className='me-2' required />
                        <label htmlFor="tick">You agree with terms & conditions</label>
                    </div>
                </form>
                <div className='register-link'>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
