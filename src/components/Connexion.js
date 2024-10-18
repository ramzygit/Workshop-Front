import '../styles/Connexion.css';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';  // Utilisation de l'import moderne

const Connexion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useAuth(); // Récupération du contexte d'authentification

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            console.log('Sending login request');
            const response = await axios.post('http://localhost:3001/auth/login', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            
            console.log('Response:', response);

            const data = response.data;
            console.log('Data:', data);

            // Axios gère automatiquement les erreurs HTTP, donc pas besoin de response.ok
            if (response.status === 201) {
                // Handle successful login
                console.log('Login successful', data);
                login(data.token, data.user); // Utilisation du login du contexte
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('An error occurred:', err);
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