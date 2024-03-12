// SignupForm.js
import React, { useState } from 'react';
import './Auth.css'
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../utils/Constants';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    roleType: '', // Updated to a select input
    phone: '',
    address: '',
    login_type:"email",
    password: '',
  });
const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleRegister = async () => {
    try {
      const response = await fetch(apiUrl+'auth/register/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
     
        navigate("/")
        // Handle successful login, e.g., redirect the user or update state
      } else {
        const errorData = await response.json();
        console.error('Register failed:', errorData);
        // Handle login failure, e.g., display an error message
      }
    } catch (error) {
      console.error('Error during Register:', error);
      // Handle network or other errors
    }
  };

  // React.useEffect(()=>{
  //   handleRegister()
  // },[])

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Add your signup logic here (e.g., send data to the server)
    handleRegister()
  };

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <label>
        First Name:
        <input type="text" name="first_name" value={formData.firstName} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="last_name" value={formData.lastName} onChange={handleChange} required />
      </label>
      <label>
      Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Role Type:
        <select name="roleType" value={formData.roleType} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="User">User</option>
          <option value="Coach">Coach</option>
        </select>
      </label>
      <br />
      <label>
        Phone:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
