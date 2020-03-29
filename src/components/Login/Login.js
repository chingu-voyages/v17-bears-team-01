import React from 'react';
import './Login.css';

function Login() {
  return (
    <div>
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
