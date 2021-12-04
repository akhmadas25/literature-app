import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();

const initialState = {
  isLoading: true,
  isLogin: false,
  user: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER_SUCCESS":
      return {
        isLoading: false,
        isLogin: true,
        isAdmin: false,
        user: payload,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      return {
        isLoading: false,
        isLogin: true,
        isAdmin: false,
        user: payload,
      };
    case "ADMIN_SUCCESS":
      return {
        isLoading: false,
        isLogin: true,
        isAdmin: true,
        user: payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        isLoading: false,
        isLogin: false,
        user: {},
      };

    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    console.log(state);;
  }, []);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
