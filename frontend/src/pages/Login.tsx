import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const history = useHistory();
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setMessage('');

        if (!email || !password) {
            setMessage('Please enter both email and password.');
            return;
        }

        try {
            await login(email, password);
            history.push('/dashboard');
        } catch (_error) {
            setMessage('Login failed. Please check your email and password.');
        }
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
                <button type="submit" className="btn">
                    Login
                </button>
                <div className="mt-3 text-sm">
                  <Link to="/forgot-password" className="text-cyan-600 hover:underline">Forgot password?</Link>
                </div>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Login;
