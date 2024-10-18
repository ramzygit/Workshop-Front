import React, { useState } from 'react';
import axios from 'axios';

const Verify = () => {
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [verify, setVerify] = useState(false);

    const handleChange = (e) => {
        setName(e.target.value);
    };

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

        if (!name) {
            setError('User name is missing.');
            return;
        }

        if (!file) {
            setError('Please upload a valid document.');
            return;
        }


        try {
            console.log('Sending verification request');
            console.log(name, file);
            const response = await axios.post('http://localhost:3001/identity/verify', 
                {name:name, document:file},
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
            });

            if (response.status === 201) {
                console.log('Verification successful:', response.data);
                setVerify(true);
            } else {
                setError(response.data.message || 'Verification failed.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Error uploading file. Please try again.');
        }
    }

    return (
        <div>
            <h2>Verify Identity</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text" id="name" name="name" value={name} onChange={handleChange} required
                    />
                </div>
                <div>
                    <label>Document (PNG, JPEG, JPG):</label>
                    <input type="file" accept=".png,.jpeg,.jpg" onChange={handleFileChange} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {verify && <p style={{ color: 'green' }}>Verification successful!</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Verify;