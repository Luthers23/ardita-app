import { createContext, useEffect, useReducer } from "react";
import LoadingScreen from "components/LoadingScreen";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };

    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case "REGISTER":
      return {
        ...state
      };

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    try {
      const url = process.env.REACT_APP_BACKEND;
      const response = await axios.post(`${url}/api/auth/login`, { email, password });
      const { token, email: userEmail, role } = response.data.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("email", userEmail);
      sessionStorage.setItem("role", role);

      dispatch({
        type: "LOGIN",
        payload: { user: { email: userEmail, role: role } },
      });
      return Promise.resolve();
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (email, password, role) => {
    try {
      const url = process.env.REACT_APP_BACKEND;
      const response = await axios.post(`${url}/api/auth/register`, {
        email,
        password,
        role,
      });
  
      // Tidak ada perubahan state di sini
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");

    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          const url = process.env.REACT_APP_BACKEND;
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;

          const response = await axios.get(`${url}/api/auth/profile`);
          const { email, role } = response.data.user;

          dispatch({
            type: "INIT",
            payload: { isAuthenticated: true, user: { email, role } },
          });
        } else {
          dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
        }
      } catch (error) {
        console.error("Initialization error:", error);
        dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
      }
    };

    initialize();
  }, []);

  if (!state.isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;