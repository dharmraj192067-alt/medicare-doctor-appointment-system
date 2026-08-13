import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DoctorDetails from "./pages/DoctorDetails";
import AddDoctor from "./pages/AddDoctor";
import EditDoctor from "./pages/EditDoctor";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Payment from "./pages/Payment";
import Contact from "./pages/Contact";
import { Toaster } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
useEffect(() => {
  AOS.init({
    duration: 1000,
    once: true,
  });
}, []);
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
        <Route path="/book/:doctorId" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/doctor/:id" element={<ProtectedRoute><DoctorDetails /></ProtectedRoute>} />
        <Route path="/add-doctor" element={<AdminRoute><AddDoctor /></AdminRoute>} />
        <Route path="/edit-doctor/:id" element={<AdminRoute><EditDoctor /></AdminRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;