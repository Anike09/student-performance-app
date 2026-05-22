import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const history = useHistory();
    const { register } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setMessage('');

        if (!username || !email || !password) {
            setMessage('Please fill in all registration fields.');
            return;
        }

        try {
            await register(email, username, password);
            history.push('/dashboard');
        } catch (err) {
            setMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div className="page auth-page">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="jane.doe"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="student@example.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Create a password"
                    />
                </div>
                <button type="submit" className="button">
                    Register
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Register;
