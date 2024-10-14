import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import useWindowDimensions from './misc/WindowDimensions.js';
import { UserContext } from "./context/UserContext.js";
import route from './misc/route.js';
import LoginPopup from './components/LoginPopup.js';
import HomePage from './pages/HomePage.js';
import NotFoundPage from './pages/NotFoundPage.js';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer, createNotification } from "./misc/toast.js";
import { io } from "socket.io-client";

function App() {
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);
  const { s_width, s_height } = useWindowDimensions();
  const { loggedIn } = useContext(UserContext);

  useEffect(() => {
    const socketURL = process.env.NODE_ENV === 'production'
      ? `${window.location.protocol}//${window.location.hostname}`
      : 'http://localhost:5000';

    const socket = io(socketURL, {
      transports: ["websocket"], // Use WebSocket transport
    });

    socket.on('auth', status => { 
      if (status === "success") createNotification("success", "socket connected");
      else createNotification("info", "socket can't connect");

      if (status === 'success'){
        socket.on('match found', ({message}) => {
            createNotification("info", message);
           
        })
       
        socket.on('test', ({ message }) => {
          createNotification("success", "ping success")
        })
      }
    })

    return () => socket.disconnect()


  }, []);

  const toggleLoginPopup = () => {
    setLoginPopupOpen(prev => !prev);
  };

  return (
    <div className={styles.app}>
      <div className={styles.dimensions}>{s_width}</div>
      <div className={styles.dimensions} style={{top: "40px"}}>{s_height}</div>
      <button onClick={toggleLoginPopup} style={{marginTop: "100px"}}>login</button>
      <button onClick={async ()=> {
        await axios.get(`${route}/api/auth/test`, { withCredentials: true }).then(res => {
          console.log(res.data)
        }).catch(e => {
          console.log(e);
          createNotification("error", "Error testing socket")
        })
      }} style={{marginLeft: "10px"}}>test socket</button>
      <Router>
       <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 

              />
            } 
          />
          <Route 
            path="/protected" 
            element={
              <ProtectedRoute loggedIn={loggedIn} openLogin={toggleLoginPopup}>{/* protected route requires user to be logged in */}
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
     
      {loginPopupOpen && <LoginPopup closePopup={() => setLoginPopupOpen(false)} />}
      <ToastContainer />
   </div>
  );
}

export default App;
