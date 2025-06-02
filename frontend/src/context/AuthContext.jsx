import { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext(undefined);

// Context provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined); // Can be true, false, or undefined
  const [role, setRole] = useState(undefined); // Can be "user", "expert", or undefined

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
