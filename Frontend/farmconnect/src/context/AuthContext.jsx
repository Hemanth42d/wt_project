import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload, loading: false, error: null };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: null, token: null, loading: false, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const API_BASE_URL = "http://localhost:3000/api";

  // Set axios defaults
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
      localStorage.setItem("token", state.token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [state.token]);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.get(`${API_BASE_URL}/auth/profile`);
          dispatch({ type: "SET_USER", payload: response.data.user });
          dispatch({ type: "SET_TOKEN", payload: token });
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
          dispatch({ type: "LOGOUT" });
        }
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    checkAuth();
  }, []);

  const register = async (userData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        userData
      );

      const { accessToken, user } = response.data;
      dispatch({ type: "SET_TOKEN", payload: accessToken });
      dispatch({ type: "SET_USER", payload: user });

      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      dispatch({ type: "SET_ERROR", payload: message });
      return { success: false, message };
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        credentials
      );

      const { accessToken, user } = response.data;
      dispatch({ type: "SET_TOKEN", payload: accessToken });
      dispatch({ type: "SET_USER", payload: user });

      return { success: true, message: response.data.message, user };
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      dispatch({ type: "SET_ERROR", payload: message });
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch({ type: "LOGOUT" });
    }
  };

  const clearError = () => {
    dispatch({ type: "SET_ERROR", payload: null });
  };

  const value = {
    user: state.user,
    token: state.token,
    loading: state.loading,
    error: state.error,
    register,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
