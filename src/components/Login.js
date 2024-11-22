import React, { useEffect } from 'react';
import "./Login.css"

import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const handleGoogleLogin = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  const navigate = useNavigate();
  useEffect(() => {

    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/status", {
          withCredentials: true,
        });
        if (!response.data.loggedIn) {
            navigate("/");
        }else{
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Authentication Check Error:", error);
        navigate("/");

      }
    };

    checkAuthStatus();
  }, [navigate]);

  return (
    <div className='login'>
      <h2>Login to Google</h2>
      <button onClick={handleGoogleLogin} className="google-login-btn">
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google Logo"
          className="google-logo"
        />
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
