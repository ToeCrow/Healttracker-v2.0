import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LayoutDashboard, User, Notebook, Skull } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

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
        <li>
          <NavLink
            to="/test"
            className={({ isActive }) => 
              `p-4 rounded-md ${isActive ? 'underline' : 'hover:bg-accent'}`
            }
          >
            <Skull className="inline self-center h-full mr-2" size={20} color="white" />
            TEST
          </NavLink>
        </li>
      </ul>

      {isOpen && (
        <ul className="md:hidden flex flex-col mt-4">
          <li className="my-2">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `px-4 py-2 rounded-md ${isActive ? 'underline' : 'hover:bg-accent'}`
              }
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
            >
              Profile
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink
              to="/mealLog"
              className={({ isActive }) => 
                `px-4 py-2 rounded-md ${isActive ? 'underline' : 'hover:bg-accent'}`
              }
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