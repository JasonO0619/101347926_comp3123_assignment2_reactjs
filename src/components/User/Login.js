import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../Axios/API';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/users/login', { email, password });
            localStorage.setItem('token', data.jwt_token);
            navigate('/employees');
        } catch (error) {
            alert('Login failed');
        }
    };
    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
                <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <button type="submit" className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default Login;
