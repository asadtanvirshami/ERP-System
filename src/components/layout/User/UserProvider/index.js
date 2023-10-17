import Cookies from "js-cookie";
import react,{ useContext, useState, createContext, useEffect, useCallback,memo } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = memo(({ children }) => {
  const [userData, setUserData] = useState(() => {
    const userString = Cookies.get("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        return {
          loggedIn: true,
          user,
        };
      } catch (error) {
        console.error("Error parsing user data from cookies:", error);
      }
    }
    return {
      loggedIn: false,
      user: {},
    };
  });

  const deleteUser = useCallback(() => {
    Cookies.remove("user");
    setUserData({
      loggedIn: false,
      user: {},
    });
  }, []);

  const updateUser = useCallback(
    (data) => {
      const updatedUser = {
        ...userData.user,
        ...data,
      };
      Cookies.set("user", JSON.stringify(updatedUser));
      setUserData((prev) => ({
        ...prev,
        user: updatedUser,
        loggedIn: true,
      }));
    },
    [userData.user]
  );

  return (
    <UserContext.Provider value={{ ...userData, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
});

export default UserProvider;