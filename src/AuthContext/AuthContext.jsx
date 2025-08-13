import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem('authUser');
    if (localUser) {
      setUser(JSON.parse(localUser));
      setLoading(false);
      return;
    }
    setLoading(false);
  }, []);

  // LocalStorage login only
  const login = async (credentials) => {
    const users = JSON.parse(localStorage.getItem("localUsers") || "[]");
    const found = users.find(
      (u) => u.username === credentials.username && u.password === credentials.password
    );
    if (found) {
      localStorage.setItem("authToken", found.username); // simple token
      localStorage.setItem("authUser", JSON.stringify(found));
      setUser(found);
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error('Invalid username or password.');
      throw new Error('Invalid username or password.');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setUser(null);
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext };