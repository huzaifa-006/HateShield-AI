import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import DetectionPage from "./pages/Detection";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const AnimatedRoutes = () => {
  const location = useLocation(); // Track route changes

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        } />
        <Route path="/register" element={
          <ProtectedRoute requireAuth={false}>
            <Register />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute requireAuth={true}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute requireAuth={true}>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/changepassword" element={
          <ProtectedRoute requireAuth={true}>
            <ChangePassword />
          </ProtectedRoute>
        } />
        <Route path="/detection" element={
          <ProtectedRoute requireAuth={true}>
            <DetectionPage />
          </ProtectedRoute>
        } />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default AppRoutes;
