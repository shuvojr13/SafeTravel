import React, { useState, useContext } from 'react';
import { Sun, Moon, User, LayoutDashboard, LogOut, LogIn, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';

export default function Nav() {
  const { user, logout } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
 console.log(user);
  
  const navLinks = (
    <>
      <button onClick={toggleDarkMode} className="p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
        {isDarkMode ? <Sun className="h-6 w-6 text-yellow-500" /> : <Moon className="h-6 w-6" />}
      </button>
      {user ? (
        <>
          <Link to="/profile" className="flex items-center space-x-2 text-white bg-violet-600 p-2 rounded-md">
            <User className="h-5 w-5" /> <span>Profile</span>
          </Link>
          <Link to="/dashboard" className="flex items-center space-x-2 text-white bg-violet-600 p-2 rounded-md">
            <LayoutDashboard className="h-5 w-5" /> <span>Dashboard</span>
          </Link>
          <button onClick={logout} className="flex items-center space-x-2 cursor-pointer text-white bg-violet-600 p-2 rounded-md">
            <LogOut className="h-5 w-5" /> <span>Logout</span>
          </button>
        </>
      ) : (
        <Link to="/login" className="flex items-center space-x-2 text-white bg-violet-600 p-2 rounded-md">
          <LogIn className="h-5 w-5" /> <span>Login</span>
        </Link>
      )}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center md:justify-between">
        {/* Mobile: Toggle left, logo center, menu right */}
        <div className="flex flex-1 items-center md:hidden">
          {/* Dark/Light Toggle on left */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-6 w-6 text-yellow-500" /> : <Moon className="h-6 w-6" />}
          </button>
          {/* Centered Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
              Safe Travel
            </Link>
          </div>
          {/* Mobile menu button on right */}
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop: Logo left, nav right */}
        <div className="hidden md:flex w-full justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            Safe Travel
          </Link>
          <div className="flex items-center space-x-4">
            {navLinks}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 flex flex-col space-y-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
          {/* Hide dark mode toggle in menu, since it's already on the left */}
          {user ? (
            <>
              <Link to="/profile" className="flex items-center space-x-2 text-white bg-violet-600 p-2 rounded-md">
                <User className="h-5 w-5" /> <span>Profile</span>
              </Link>
              <Link to="/dashboard" className="flex items-center space-x-2 text-white bg-violet-600 p-2 rounded-md">
                <LayoutDashboard className="h-5 w-5" /> <span>Dashboard</span>
              </Link>
              <button onClick={logout} className="flex items-center space-x-2 cursor-pointer text-white bg-violet-600 p-2 rounded-md">
                <LogOut className="h-5 w-5" /> <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center space-x-2 text-white bg-violet-600 p-2 rounded-md">
              <LogIn className="h-5 w-5" /> <span>Login</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
