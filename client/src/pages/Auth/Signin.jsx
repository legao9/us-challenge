// SignInForm.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {apiUrl} from '../../utils/Constants';

// import './Auth.css'

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    email: '',login_type: 'email',
    password: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  //react navigate component
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}auth/login/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInData),
      });

      if (response.ok) {
        const {data} = await response.json();
        setIsAuthenticated(true)
          // If login is successful, extract the token from the response
          const { token } = data
          const {user} = data
          localStorage.setItem("email",data.user.email)
          localStorage.setItem("id",data.user._id)
localStorage.setItem("user",data.user.role_type)
          // Store the token in LocalStorage
          localStorage.setItem('token', token);
          // navigate("/")
          
         
       
        // Handle successful login, e.g., redirect the user or update state
      } else {
        const errorData = await response.json();
        console.error('Sign in failed:', errorData);
        // Handle login failure, e.g., display an error message
      }
    } catch (error) {
      console.error('Error during Register:', error);
      // Handle network or other errors
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin()

    if (isAuthenticated) {
      // Redirect to the /dashboard page
      navigate('/dashboard');
    } else {
      // Handle unsuccessful authentication
      console.log('Authentication failed');
    }
  
  };

  return (
    <form onSubmit={handleSubmit} className='auth-form bg-red-500'>
      <label>
        Email:
        <input type="email" name="email" value={signInData.username} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={signInData.password} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
