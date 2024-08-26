import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import webSocketClient from "../services/websocket"; // Importar WebSocketClient

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        axios.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
        webSocketClient.connect('ws://localhost:8080/ws'); // Conectar ao WebSocket
      }
    };
    loadingStoreData();
  }, []);

  const signIn = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', data);
      if (response.data.error) {
        alert(response.data.error);
        return false;
      } else {
        setUser(response.data.user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
        localStorage.setItem("@Auth:token", response.data.token);
        webSocketClient.connect('ws://localhost:8080/ws'); // Conectar ao WebSocket após login
        return true;
      }
    } catch (error) {
      console.error("Error during sign in:", error.response || error.message);
      return false;
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    webSocketClient.socket.close();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signIn,
        signOut
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};