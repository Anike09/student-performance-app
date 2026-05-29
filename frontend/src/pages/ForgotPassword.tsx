import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: In a real app we'd trigger a password reset email flow.
    setMessage('If this email is registered, a password reset link will be sent.');
  };

  return (
    <div className="page auth-page">
      <h1>Forgot password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <button type="submit" className="btn">Send reset link</button>
        {message && <p className="mt-2 text-sm text-slate-700">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
