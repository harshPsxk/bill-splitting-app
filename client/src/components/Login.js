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
    <div className="flex min-h-screen overflow-hidden">
      <div className="flex flex-col justify-center items-center w-1/2 p-2">
        <div className="w-full max-w-xs">
          <h2 className="text-xl mb-4">Login</h2>
          {error && <p className="error text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="relative mb-4">
              <input
                type="text"
                name="name"
                value={credentials.name}
                onChange={handleChange}
                placeholder="Name (optional)"
                className="w-full bg-transparent border-0 border-b border-gray-300 focus:border-blue-500 focus:outline-none p-2 hover:border-blue-500"
              />
            </div>
            <div className="relative mb-4">
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full bg-transparent border-0 border-b border-gray-300 focus:border-blue-500 focus:outline-none p-2 hover:border-blue-500"
              />
            </div>
            <div className="relative mb-4">
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full bg-transparent border-0 border-b border-gray-300 focus:border-blue-500 focus:outline-none p-2 hover:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>

            <button
              type="button"
              className="w-full p-2 mt-2"
              onClick={() => navigate('/register')} 
            >
              Not a user? Register Here
            </button>
          </form>
        </div>
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <img
          src="/login-page.jpg"
          alt="Login Page"
          className="w-full h-full object-cover rounded-l-3xl"
        />
      </div>
    </div>
  );
};

export default Login;
