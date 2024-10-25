import React, { useState } from 'react';
import axios from 'axios';

const AddTraining = () => {
    const [title, setTitle] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [trainerId, setTrainerId] = useState('');
    const [capacity, setCapacity] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trainingData = { title, dateTime, trainerId: parseInt(trainerId), capacity: parseInt(capacity) };

        try {
            const response = await axios.post('https://localhost:7058/api/schedule', trainingData);
            console.log('Training added:', response.data);
            setMessage('Training added successfully!');
            setTitle('');
            setDateTime('');
            setTrainerId('');
            setCapacity('');
        } catch (error) {
            console.error('Error adding training:', error);
            setMessage('Error adding training. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Trainer ID"
                    value={trainerId}
                    onChange={(e) => setTrainerId(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                />
                <button type="submit">Add Training</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddTraining;
