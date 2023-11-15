import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { RootState } from "../../redux/store";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const theme = useSelector((state: RootState) => state.theme.theme);

  const dispatch = useDispatch();

  return (
    <div>
      <nav
        className={`bg-gray-800 text-white ${
          theme === "dark" ? "bg-gray-800 " : "bg-[#f2eeee91] text-gray-800"
        } text-${theme === "dark" ? "white" : "gray-800"} `}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/* Logo */}
              <div>
                <a
                  href="#"
                  className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
                >
                  <span className="font-bold">Brand</span>
                </a>
              </div>

              {/* Primary Nav */}
              <div className="hidden md:flex items-center space-x-1">
                <a href="#" className="py-5 px-3">
                  Home
                </a>
                <a href="#" className="py-5 px-3">
                  About
                </a>
                {/* More nav items */}
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search"
                className="px-2 py-1 rounded"
              />
              <button className="px-2 py-1 bg-blue-500 text-white rounded">
                Search
              </button>
            </div>

            {/* Theme Toggle & Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Theme Toggle */}
              <button onClick={() => dispatch(toggleTheme())}>
                {/* Icon or text to represent theme toggle */}
                <span>{theme === "light" ? "🌞" : "🌜"}</span>
              </button>

              {/* Auth Buttons */}
              <a href="/login" className="py-2 px-3">
                Login
              </a>
              <a
                href="/signup"
                className="py-2 px-3 bg-blue-500 text-white rounded"
              >
                Sign Up
              </a>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">
            Home
          </a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">
            About
          </a>
          {/* More nav items */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

// background: #f2eeee91;
// color: #1f2937;
