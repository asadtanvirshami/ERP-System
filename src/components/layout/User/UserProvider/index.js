import Cookies from "js-cookie";
import { useContext, useState, createContext, useEffect } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    loggedIn: false,
    user: {},
  });

  const deleteUser = () => {
    setUserData({
      loggedIn: false,
      user: {},
    });
  };

  const updateUser = (data) => {
    setUserData((prev) => ({
      ...prev,
      user: { ...prev.user, ...data },
      loggedIn: true,
    }));
  };

  useEffect(() => {
    const getUserDataFromCookies = () => {
      const userString = Cookies.get("user");

      if (userString) {
        try {
          const user = JSON.parse(userString);
          updateUser(user);
        } catch (error) {
          console.error("Error parsing user data from cookies:", error);
        }
      }
    };

    getUserDataFromCookies();
  }, []);

  return (
    <UserContext.Provider value={{ ...userData, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}
