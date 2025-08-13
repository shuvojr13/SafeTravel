import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../AuthContext/AuthContext";
import Nav from "../shared/Nav";
import Footer from "../shared/Footer";
import { Toaster } from "react-hot-toast";
import ProfilePage from "../pages/ProfilePage";
import Dashboard from "../components/dashboard/Dashboard";
import DestinationDetails from "../components/dashboard/DestinationDetails";
import Itinerary from "../components/dashboard/Itinerary";
import ScrollToTop from "../utils/SCrollToTop";
import  SignUp  from "../components/signup/SignUp";
import NotFound from "../utils/NotFound";
// ...
const AppRoute = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <Nav />
        <Toaster position="top-right" />
        <ScrollToTop />
        <div className="flex-1 overflow-y-auto  dark:bg-gray-600">
          <Routes>
            <Route path="/*" element={<NotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/destination/:id" element={<DestinationDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/itinerary" element={<Itinerary />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default AppRoute;
