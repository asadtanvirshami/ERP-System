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
    user: {type: '',id:''},
  });

  const deleteUser = () => {
    setUserData((prev) => {
      return {
        ...prev,
        loggedIn: false,
        user: {},
      };
    });
  };

  const updateUser = async (data) => {
    setUserData((prev) => {
      return { ...prev, user: { ...prev.user, ...data } };
    });
  };

  const getUserFromCookie = () => {
    const userString = Cookies.get('user');
    if (userString) {
      try {
          const user = JSON.parse(userString);
          updateUser(user);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  };


  useEffect(() => {
  getUserFromCookie();
  }, []);

  const value = {
    loggedIn: userData.loggedIn,
    user: userData.user,
    updateUser,
    deleteUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

