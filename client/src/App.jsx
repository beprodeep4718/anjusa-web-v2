import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import useAuth from "./store/authStore.js";
import { LoaderCircle } from "lucide-react";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import PreviewNotice from "./components/PreviewNotice.jsx";
import AllNotices from "./pages/AllNotices.jsx";
import Cursor from "./components/animation/Cursor.jsx";
import Profile from "./pages/Profile.jsx";
import Arkwork from "./pages/Arkwork.jsx";
import StudentRegister from "./pages/StudentRegister.jsx";

const App = () => {
  const lenis = useLenis();
  const { user, isCheckingAuth, authenticate } = useAuth();
  const location = useLocation();

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  if (isCheckingAuth && !user) {
    return (
      <div
        data-theme="business"
        className="flex justify-center items-center h-screen"
      >
        <LoaderCircle strokeWidth={1} className="size-10 animate-spin" />
      </div>
    );
  }

  // List of routes where we want to hide Navbar/Footer
  const hideLayoutOn = ["/login", "/register", "/admin"];
  const hideLayout = hideLayoutOn.includes(location.pathname);

  return (
    <div className="bg-base-300 relative">
      {/* <Cursor /> */}
      <ReactLenis
        root
        options={{
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        }}
        onScroll={(e) => {
          lenis.raf(e);
        }}
      />

      {/* Conditionally render Navbar/Footer */}
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />
        <Route path="/arkwork" element={<Arkwork />} />
        <Route path="/notices" element={<AllNotices />} />
        <Route path="/notice/:id" element={<PreviewNotice />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/student-register"
          element={!user || user.role !== "artist" ? <StudentRegister /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>

      {!hideLayout && <Footer />}
      <Toaster />
    </div>
  );
};

export default App;
