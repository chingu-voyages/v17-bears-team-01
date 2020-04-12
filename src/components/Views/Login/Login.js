import React from 'react';
import './Login.css';

// Point to dashboard

function Login() {
  return (
    <div className='login-container'>
      <a href="http://localhost:4000/auth/facebook" className="loginBtn loginBtn--facebook">
      Login with Facebook
      </a>

      <a href="http://localhost:4000/auth/google" className="loginBtn loginBtn--google">
      Login with Google
      </a>
    </div>
  );
}

export default Login;
