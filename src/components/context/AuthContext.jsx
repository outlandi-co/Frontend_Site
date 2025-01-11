// src/context/authContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser); // Set user from localStorage if available
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
        localStorage.removeItem('user'); // Clear invalid data from localStorage
      }
    }
  }, []);

  // Handle login
  const login = (userData) => {
    if (userData && userData.name && userData.email) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Save user data in localStorage
    } else {
      console.error('Invalid user data provided for login');
    }
  };

  // Handle logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// PropTypes to enforce the expected types
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
