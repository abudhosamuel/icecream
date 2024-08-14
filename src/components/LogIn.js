import React, { useState } from 'react';
import './LogIn.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        const validUsername = 'admin';
        const validPassword = 'password';

        if (username === validUsername && password === validPassword) {
            localStorage.setItem('loggedIn', 'true');
            onLogin();
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-form">
            <h2>Admin Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;


