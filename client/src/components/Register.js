import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './style.css'; 

const Register = () => {
    const [values, setValues] = useState({ email: '', password: '', isAdmin: true });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/auth/register', values)
            .then(result => {
                if (result.data.success) {
                    alert('Registration Successful');
                    navigate('/login');
                } else {
                    setError(result.data.Error);
                }
            })
            .catch(err => {
                console.error(err);
                setError("Network Error. Please try again.");
            });
    };

    return (
        <div className='registerPage'>
            <div className='registerForm'>
                <div className='text-warning'>
                    {error && <p className="error-message">{error}</p>}
                </div>
                <h2>REGISTER</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input
                            type="email"
                            name='email'
                            autoComplete='off'
                            placeholder='Enter Email'
                            value={values.email}
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input
                            type="password"
                            name='password'
                            placeholder='Enter Password'
                            value={values.password}
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className='form-control rounded-0'
                        />
                    </div>
                    {/* <div className='form-group'>
                        <input
                            type="checkbox"
                            name='isAdmin'
                            checked={values.isAdmin}
                            onChange={(e) => setValues({ ...values, isAdmin: e.target.checked })}
                        />
                        <label htmlFor="isAdmin" className='ms-2'>Register Admin</label>
                    </div> */}
                    <button type="submit" className='btn btn-red w-100 rounded-0 mb-2'>Register</button>

                </form>
                <div className='login-link'>
                    <Link to="/login">Do you have an account Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
