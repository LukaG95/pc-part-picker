import React, { useState, useEffect } from "react";
import axios from "axios";
import route from '../misc/route';

const UserContext = React.createContext();

function UserContextProvider({ children }) {
const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    getUserInfo()

  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedIn
      }}
    >
      {children}
    </UserContext.Provider>
  );

  function getUserInfo(){
    axios
    .get(`${route}/api/auth/getUser`, { withCredentials: true })
    .then((res) => { 
      if (res.data.success) {
        setLoggedIn(true);
        console.log(res.data)
      }
    })
    .catch((err) => {
      setLoggedIn(false);
      if (err.response){
        console.log(err.response)
      }
    });
  }

}



export { UserContextProvider, UserContext };