import axios from "axios";
import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();
const API = axios.create({ baseURL: process.env.REACT_APP_API + "/vendors" });

export const AuthContextProvider = ({ children }) => {
  const [vendor, setVendor] = useState(() => {
    if (localStorage.getItem("token")) {
      return jwt_decode(JSON.parse(localStorage.getItem("token")).accessToken);
    }
    return null;
  });


  const login = async (payload) => {
    try {
      const apiResponse = await API.post("/signin", payload, {
        withCredentials: true,
      });
      localStorage.setItem("token", JSON.stringify(apiResponse.data));
      setVendor(jwt_decode(apiResponse.data.accessToken));
    } catch (error) {
      throw error.response.data.message;
    }
  };

  const logout = async () => {
    await API.post("/logout");
    localStorage.removeItem("token");
    setVendor(null);
  };

  return (
    <AuthContext.Provider
      value={{ vendor, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;