import React, { useState } from 'react';

const AssignCoach = () => {
    const [email, setEmail] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [message, setMessage] = useState('');

    const handleAssignCoach = async () => {
        try {
            const userResponse = await fetch(`https://localhost:7058/api/users?email=${email}`);
            const user = await userResponse.json();

            if (!user) {
                setMessage('User not found');
                return;
            }

            await fetch(`https://localhost:7058/api/users/${user.id}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: 'Coach' }),
            });

            await fetch('https://localhost:7058/api/coaches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id, specialty }),
            });

            setMessage('Added new trainer');
            setEmail('');
            setSpecialty('');
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Assign Trainer</h2>
            <input
                type="email"
                placeholder="Enter user email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter speciality"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
            />
            <button onClick={handleAssignCoach}>Add</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AssignCoach;
