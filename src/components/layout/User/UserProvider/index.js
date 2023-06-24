import Cookies from "js-cookie";
import { useContext, useState, createContext, useEffect, useRef } from "react";

const UserContext = createContext();

export function User() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    loggedIn: false,
    isAuthenticated: false,
    user: {},
  });

  const deleteUser = () => {
    setUserData((prev) => {
      return {
        ...prev,
        loggedIn,
        user: {},
      };
    });
  };

  const updateUser = async (data) => {
    setUserData((prev) => {
      return { ...prev, user: { ...prev.user, ...data  }, loggedIn:true };
    });
  };

  const getUserFromCookie = () => {
    
   
  };


  useEffect(() => {
    async function getUserDataFromCookies() {
      const userString = Cookies.get('user');

    if (userString) {
      try {
          const user = JSON.parse(userString);
          updateUser(user);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }
  getUserDataFromCookies()
  }, []);

  const value = {
    loggedIn: userData.loggedIn,
    user: userData.user,
    updateUser,
    deleteUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

