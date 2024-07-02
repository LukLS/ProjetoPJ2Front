import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
      }
    };
    loadingStoreData();
  }, []);

  const signIn = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', data);
      if (response.data.error) {
        alert(response.data.error);
        return false; // Retorna false em caso de erro
      } else {
        setUser(response.data.user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
        localStorage.setItem("@Auth:token", response.data.token);
        return true; // Retorna true em caso de sucesso
      }
    } catch (error) {
      console.log("Error during sign in:", error.response || error.message);
      return false; // Retorna false em caso de exceção
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut
      }}>
      {children}
    </AuthContext.Provider>
  );
};
