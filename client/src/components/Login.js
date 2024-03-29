import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    name: '', // Optional name field
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: credentials.email,
        password: credentials.password,
        // Not sending the name to the backend as it's not used for login
      });
      console.log(response.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response.data.msg || 'Login failed');
    }
  };

  return (
    <div>
      <div className="login-container">
        <h2 className='text-xl'>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            placeholder="Name (optional)"
          />
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
