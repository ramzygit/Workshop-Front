import '../styles/Connexion.css';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
const axios = require('axios');

const Connexion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useAuth();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                }
            });

            const data = response.data;

     

            if (response.ok) {
                // Handle successful login
                console.log('Login successful', data);
                login(data.token, data.user);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="connexion">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                {error && <p className="error">{error}</p>}
                {isAuthenticated && <p className="success">Login successful</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Connexion;