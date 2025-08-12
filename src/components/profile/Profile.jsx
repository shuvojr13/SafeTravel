// Profile.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import { Link } from 'react-router-dom';

export default function Profile() {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <p className="text-center mt-10">No profile data available. Please log in.</p>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-indigo-400 opacity-20 rounded-full z-0"></div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-400 opacity-20 rounded-full z-0"></div>

                {/* Profile Image */}
                <div className="relative z-10">
                    <img
                        src={user.image}
                        alt={user.username}
                        className="w-32 h-32 mx-auto rounded-full border-4 border-indigo-500 shadow-lg object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {/* Username */}
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight z-10">
                    @{user.username}
                </h2>

                {/* Full Name */}
                <p className="mt-2 text-lg text-gray-700 dark:text-gray-300 font-medium z-10">
                    {user.firstName} {user.lastName}
                </p>

                {/* Email */}
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 z-10">{user.email}</p>

                {/* Gender */}
                <p className="mt-4 z-10">
                    <span className="inline-block px-4 py-1 bg-gradient-to-r from-indigo-400 to-pink-400 dark:from-indigo-600 dark:to-pink-600 text-white rounded-full text-sm font-semibold shadow-md">
                        {user.gender}
                    </span>
                </p>

                {/* Divider */}
                <div className="my-6 border-t border-gray-200 dark:border-gray-700"></div>

                {/* Action Button */}
                <button className="z-10 mt-2 px-6 py-2 bg-indigo-500 hover:bg-pink-500 transition-colors duration-300 text-white rounded-full font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    <Link to="/itinerary">View Itinerary Details</Link>
                </button>
            </div>
        </div>
    );
}
