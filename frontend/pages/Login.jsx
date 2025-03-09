import React from 'react';
import { useState } from 'react';
import styles from "./SignUp.module.css";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from '../src/utils';

export default function Login() {
  const [LoginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...LoginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const {email, password } = LoginInfo;
    if (!email || !password) {
      return (handleError("All fields are required."));
    }
    try {
      const url = "http://localhost:8000/auth/login";
      const response = await axios.post(url, LoginInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      const result = response.data;
      const { message, success ,jwtToken,name,error} = result;
      console.log(result);
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token",jwtToken);
        localStorage.setItem("loggedInUser",name);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
      else if(error)
      {
        const details= error?.details[0].message;
        handleError(details);
      }
      else if(!success)
      {
        handleError(message);
      }


    } catch (error) {
      const details= error?.response.data.error.details[0].message;
      handleError(details);
    }
  };

  return (
    <div className={styles.MainBlockBackground}>
      <div className={styles.MainBlock}>
        <h1>Login</h1>
        <form className={styles.FormMain} onSubmit={handleLogin}>
          
          <div className={styles.InputBar}>
            <label htmlFor='email'>Email</label>
            <input
              onChange={handleChange}
              type='email'
              name='email'
              autoFocus
              placeholder='Enter your Email id'
              value={LoginInfo.email}
            />
          </div>
          <div className={styles.InputBar}>
            <label htmlFor='password'>Password</label>
            <input
              onChange={handleChange}
              type='password'
              name='password'
              autoComplete="on"
              placeholder='Enter your password'
              value={LoginInfo.password}
            />
          </div>
          <div className={styles.SubmitButton}><button type='submit'>Login</button></div>

        </form>
        <span className={styles.AccountExist}>Don't have an account?
          <Link to="/signup">Sign In</Link>
        </span>
        <ToastContainer />
      </div>
    </div>
  );
}
