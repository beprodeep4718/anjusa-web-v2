import React, { useState, useRef} from "react";
import { AlignRight, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import useAuth from "../store/authStore.js"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const iconRef = useRef(null);

  const {user, logout} = useAuth();

  useGSAP(() => {
    if (menuRef.current) {
      gsap.set(menuRef.current, { x: "100%", opacity: 0 });
    }
  });

  const toggleMenu = () => {
    if (!menuRef.current) return;

    if (!menuOpen) {
      // Opening animation
      setMenuOpen(true);
      
      // Animate menu sliding in
      gsap.to(menuRef.current, {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });

      // Stagger animation for menu items
      gsap.fromTo(menuItemsRef.current, 
        { 
          x: 50, 
          opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out"
        }
      );

      // Icon rotation
      gsap.to(iconRef.current, {
        rotation: 180,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      // Closing animation
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => setMenuOpen(false)
      });

      // Icon rotation back
      gsap.to(iconRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <>
      <div className="navbar fixed border-b-[1px] bg-base-300 border-b-base-content z-10">
        <div className="absolute h-full w-[1px] bg-base-content top-0 right-20"></div>
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            <img className="w-20 filter invert brightness-0" src="images/logo.png" alt="" />
          </Link>
        </div>
        <div className="flex-none">
          <button 
            ref={iconRef}
            className="btn btn-square btn-ghost" 
            onClick={toggleMenu}
          >
            {menuOpen ? <X strokeWidth={1} size={30} /> : <AlignRight strokeWidth={1} size={30} />}
          </button>
        </div>
      </div>
      
      {/* Animated Menu */}
      <div 
        ref={menuRef}
        className="fixed top-16 right-0 w-1/2 h-full bg-base-200 shadow-lg z-20"
      >
        <ul className="menu p-4 text-lg lg:text-5xl font-[inter] font-light space-y-4">
          <li ref={el => menuItemsRef.current[0] = el}>
            <Link to="/">Home</Link>
          </li>
          <li ref={el => menuItemsRef.current[1] = el}>
            <Link to="/about">About</Link>
          </li>
          {user ? (
            <>
              <li ref={el => menuItemsRef.current[2] = el}>
                <Link to="/profile">Profile</Link>
              </li>
              {user.role === 'admin' && (
                <li ref={el => menuItemsRef.current[3] = el}>
                  <Link to="/admin">Admin Panel</Link>
                </li>
              )}
              <li ref={el => menuItemsRef.current[user.role === 'admin' ? 4 : 3] = el}>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li ref={el => menuItemsRef.current[2] = el}>
                <Link to="/login">Login</Link>
              </li>
              <li ref={el => menuItemsRef.current[3] = el}>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
