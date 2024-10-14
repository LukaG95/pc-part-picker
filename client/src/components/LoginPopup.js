import React, { useState } from 'react';
import axios from 'axios';
import styles from './LoginPopup.module.scss';

import { createNotification } from "../misc/toast";
import route from '../misc/route.js';

const LoginPopup = ({ closePopup }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  /* const [email, setEmail] = useState('');  */
  const [passwordConfirm, setPasswordConfirm] = useState(''); 
  const [isMouseDownInsidePopup, setIsMouseDownInsidePopup] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isMouseDownInsidePopup) {
      closePopup();
    }
  };

  const handleMouseDown = (e) => {
    // Check if mousedown event started inside the popup
    if (e.target.closest(`.${styles.popup}`)) {
      setIsMouseDownInsidePopup(true);
    } else {
      setIsMouseDownInsidePopup(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${route}/api/auth/login`, {
        username,
        password,
      },{
        withCredentials: true
      });
      console.log('Login successful:', response.data);
      closePopup();
      createNotification('success', 'Logged in');
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      createNotification('error', 'Error loggin in');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      console.error("Passwords don't match!");
      createNotification('error', 'Passwords don\'t match!');
      return;
    }

    try {
      const response = await axios.post(`${route}/api/auth/signup`, {
        username,
        /* email, */
        password,
        passwordConfirm, 
      });
      console.log('Signup successful:', response.data);
      closePopup();
      createNotification('success', 'Signed up');
    } catch (error) {
      console.error('Error signing up:', error.response?.data || error.message);
      createNotification('error', 'Error signing up');
    }
  };

  return (
    <div className={styles.overlay} onMouseDown={handleMouseDown} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        <div className={styles.tabHeader}>
          <button
            className={`${styles.tabButton} ${activeTab === 'login' ? styles.active : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'signup' ? styles.active : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Signup
          </button>
        </div>

        {activeTab === 'login' && (
          <div className={styles.formContent}>
            <h2 className={styles.heading}>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="loginUsername">Username</label>
                <input
                  type="text"
                  id="loginUsername"
                  placeholder="Enter username"
                  className={styles.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="loginPassword">Password</label>
                <input
                  type="password"
                  id="loginPassword"
                  placeholder="Enter password"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.submitBtn}>Login</button>
            </form>
          </div>
        )}

        {activeTab === 'signup' && (
          <div className={styles.formContent}>
            <h2 className={styles.heading}>Signup</h2>
            <form onSubmit={handleSignupSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="signupUsername">Username</label>
                <input
                  type="text"
                  id="signupUsername"
                  placeholder="Choose a username"
                  className={styles.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            {/*   <div className={styles.formGroup}>
                <label htmlFor="signupEmail">Email</label>
                <input
                  type="email"
                  id="signupEmail"
                  placeholder="Enter your email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div> */}
              <div className={styles.formGroup}>
                <label htmlFor="signupPassword">Password</label>
                <input
                  type="password"
                  id="signupPassword"
                  placeholder="Create a password"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                  type="password"
                  id="passwordConfirm"
                  placeholder="Confirm your password"
                  className={styles.input}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.submitBtn}>Signup</button>
            </form>
          </div>
        )}

        <button className={styles.closeBtn} onClick={closePopup}>Close</button>
      </div>
    </div>
  );
};

export default LoginPopup;
