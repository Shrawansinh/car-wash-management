import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { ToastProvider } from "./componenets/Toast/ToastCongtext";
import AdminBookings from "./pages/Admin/AdminBookings";
import AdminCustomers from "./pages/Admin/AdminCustomers";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminGallery from "./pages/Admin/AdminGallery";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminServices from "./pages/Admin/AdminServices";
import AdminTimeslot from "./pages/Admin/AdminTimeSlot";
import BookService from "./pages/BookService/BookService";
import Home from "./pages/Home";

import api from "./api/api";

const ProtectedAdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/admin/profile");

        setAuthenticated(true);
      } catch (error) {
        console.error("Auth check failed:", error);

        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Checking authentication...
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <ToastProvider>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/bookService" element={<BookService />} />
      <Route path="/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="timeslots" element={<AdminTimeslot />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="gallery" element={<AdminGallery />} />
      </Route>
    </Routes>
    </ToastProvider>
  );
};

export default App;