import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LayoutDashboard, User, Notebook } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const firstMenuItemRef = useRef(null);
  const lastMenuItemRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      if (isOpen) {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            // If shift + tab is pressed and focus is on the first item, move focus to the last item
            if (document.activeElement === firstMenuItemRef.current) {
              e.preventDefault();
              lastMenuItemRef.current.focus();
            }
          } else {
            // If tab is pressed and focus is on the last item, move focus to the first item
            if (document.activeElement === lastMenuItemRef.current) {
              e.preventDefault();
              firstMenuItemRef.current.focus();
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <nav className="flex justify-end w-full">
      <button
        onClick={toggleNavbar}
        className="px-4 py-2 h-fit self-center hover:bg-accent rounded-md md:hidden"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <ul className="hidden md:flex gap-8">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => 
              `p-4 rounded-md ${isActive ? 'underline' : 'hover:bg-accent'}`
            }
          >
            <LayoutDashboard className="inline self-center h-full mr-2" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profileform"
            className={({ isActive }) => 
              `p-4 rounded-md ${isActive ? 'underline' : 'hover:bg-accent'}`
            }
          >
            <User className="inline self-center h-full mr-2" />
            Profil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mealLog"
            className={({ isActive }) => 
              `p-4 rounded-md ${isActive ? 'underline' : 'hover:bg-accent'}`
            }
          >
            <Notebook className="inline self-center h-full mr-2" />
            Måltider
          </NavLink>
        </li>
      </ul>

      {isOpen && (
        <ul className="md:hidden flex flex-col mt-4" ref={menuRef}>
          <li className="my-2">
            <NavLink
              to="/"
              ref={firstMenuItemRef}
              className={({ isActive }) => 
                `px-4 py-2 rounded-md ${isActive ? 'underline' : 'hover:bg-accent'}`
              }
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink
              to="/profileform"
              className={({ isActive }) => 
                `px-4 py-2 rounded-md ${isActive ? 'underline' : 'hover:bg-accent'}`
              }
              onClick={() => setIsOpen(false)}
            >
              Profile
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink
              to="/mealLog"
              ref={lastMenuItemRef}
              className={({ isActive }) => 
                `px-4 py-2 rounded-md ${isActive ? 'underline' : 'hover:bg-accent'}`
              }
              onClick={() => setIsOpen(false)}
            >
              Meallog
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;