import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
const Verify = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const { user } = useAuth(); 

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/jpg')) {
            setFile(selectedFile);
            setError('');
        } else {
            setFile(null);
            setError('Please upload a valid PNG, JPEG, or JPG file.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.name && file) {
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:3001/identity/verify', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
                setError('Error uploading file. Please try again.');
            }
        } else {
            setError('Please provide both a name and a valid document.');
        }
    }

    return (
        <div>
            <h2>Verify Identity</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={user.name} readOnly />
                </div>
                <div>
                    <label>Document (PNG, JPEG, JPG):</label>
                    <input type="file" accept=".png,.jpeg,.jpg" onChange={handleFileChange} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
export default Verify;