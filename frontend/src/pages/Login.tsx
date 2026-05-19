import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const history = useHistory();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setMessage('');

        if (!email || !password) {
            setMessage('Please enter both email and password.');
            return;
        }

        setMessage('Login successful. Redirecting...');
        setTimeout(() => history.push('/dashboard'), 800);
    };

    return (
        <div className="page auth-page">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
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
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="button">
                    Login
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Login;
