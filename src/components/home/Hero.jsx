import React,{useContext} from 'react';
import { ArrowRight } from 'lucide-react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthContext';
const Hero = () => {
   const { user } = useContext(AuthContext);
  return (
    <section className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
  Welcome to Safe Travel
</h1>

        {/* Image */}
        <div className="w-full md:w-1/2 mx-auto">
          <img
            src="https://i.pinimg.com/736x/01/44/e2/0144e236b53ede31bbcce8f63d183228.jpg" // Replace with your actual image path
            alt="Happy travelers"
            className="rounded-lg  w-1/4 h-auto object-cover mx-auto"
          />
        </div>
        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Partner with us for secure, reliable, and professional travel solutions tailored to your needs.
        </p>
        {/* Call to Action */}
        {user ? (
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 hover:bg-gray-900 dark:hover:bg-gray-300 py-3 px-6 rounded-md shadow-sm text-base font-medium transition-colors duration-200"
          >
            <span>Visit Dashboard</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 hover:bg-gray-900 dark:hover:bg-gray-300 py-3 px-6 rounded-md shadow-sm text-base font-medium transition-colors duration-200"
          >
            <span>Begin Your Journey</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        )}
      </div>
    </section>
  );
};

export default Hero;