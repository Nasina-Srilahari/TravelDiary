import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";
import image from "./11.png";

const Register = () => {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    email: "",
    country: "",
    city: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegistrationChange = (e) => {
    setRegistrationData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/auth/register", registrationData);
      setLoading(false);

      // Handle successful registration, e.g., redirect to login page
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="register">
      <div className="rContainer1">
      <img src={image} style={{ width: "400px", height: "400px" }} />
      </div>
      <div className="rContainer2">
        <h1 className="register-heading">
          Register
        </h1>
        <center>
        <form onSubmit={handleRegistrationSubmit} className="registrationForm">
        
            <input
              type="text"
              placeholder="Username"
              id="username"
              value={registrationData.username}
              onChange={handleRegistrationChange}
              className="rInput"
              required
            />
     
        
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={registrationData.password}
              onChange={handleRegistrationChange}
              className="rInput"
              required
            />
     
      
            <input
              type="text"
              placeholder="Email"
              id="email"
              value={registrationData.email}
              onChange={handleRegistrationChange}
              className="rInput"
              required
            />
     
    
            <input
              type="text"
              placeholder="Country"
              id="country"
              value={registrationData.country}
              onChange={handleRegistrationChange}
              className="rInput"
              required
            />
        
          
            <input
              type="text"
              placeholder="City"
              id="city"
              value={registrationData.city}
              onChange={handleRegistrationChange}
              className="rInput"
              required
            />
          
          
            <input
              type="text"
              placeholder="Phone"
              id="phone"
              value={registrationData.phone}
              onChange={handleRegistrationChange}
              className="rInput"
              required
            />
       
          
            <button
              type="submit"
              disabled={loading}
              className="rButton"
            >
              Register
            </button>
    
        </form>
        </center>      

      </div>
    </div>
  );
};

export default Register;
