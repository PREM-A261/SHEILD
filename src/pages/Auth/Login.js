import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Components';
import mockUsers, { roleLabels } from '../../data/users';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const result = login(email, password);
        if (result.success) {
            // Redirect to risk map for admins/ngos, home for basic users
            const dest = result.user.role === 'basic_user' ? '/' : '/risk-map';
            navigate(location.state?.from?.pathname || dest, { replace: true });
        } else {
            setError(result.error);
        }
    };

    // Helper to autofill for demo purposes
    const autoFill = (role) => {
        const user = mockUsers.find(u => u.role === role);
        if (user) {
            setEmail(user.email);
            setPassword(user.password);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to access the Gender Equity Intelligence Platform</p>
                </div>

                <Card>
                    <form className="login-form" onSubmit={handleSubmit}>
                        {error && <div className="login-error">{error}</div>}

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                        </div>

                        <button type="submit" className="btn-submit">Sign In</button>
                    </form>
                </Card>

                <div className="demo-accounts">
                    <p className="demo-title">Demo Accounts (Click to auto-fill):</p>
                    <div className="demo-buttons">
                        <button onClick={() => autoFill('gov_admin')} className="demo-btn demo-gov">
                            Gov Admin
                        </button>
                        <button onClick={() => autoFill('ngo_user')} className="demo-btn demo-ngo">
                            NGO User
                        </button>
                        <button onClick={() => autoFill('basic_user')} className="demo-btn demo-basic">
                            Basic User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
