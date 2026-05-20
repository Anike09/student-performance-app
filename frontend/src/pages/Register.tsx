import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [matricNo, setMatricNo] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const history = useHistory();
    const { register } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setMessage('');

        if (!name || !email || !password || !matricNo) {
            setMessage('Please fill in all registration fields.');
            return;
        }

        try {
            await register(name, email, matricNo);
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
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Jane Doe"
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
                    <label htmlFor="matricNo">Matric Number</label>
                    <input
                        id="matricNo"
                        type="text"
                        value={matricNo}
                        onChange={(event) => setMatricNo(event.target.value)}
                        placeholder="Enter matric number"
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
