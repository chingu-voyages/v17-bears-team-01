import React from 'react';
import './Login.css';

// Point to dashboard

export default class Login extends React.Component {
  render() {
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
  }

