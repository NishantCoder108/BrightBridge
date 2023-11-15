import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { clearToken } from "../../redux/slices/authSlice";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const tokenAccess = useSelector((state: RootState) => state.course.token);

  console.log({ tokenAccess });
  const dispatch = useDispatch();

  return (
    <div>
      <nav
        className={`bg-gray-800 text-white py-3 ${
          theme === "dark" ? "bg-gray-800 " : "bg-[#f2eeee91] text-gray-800"
        } text-${theme === "dark" ? "white" : "gray-800"} `}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div className="flex justify-center items-center ">
                <Link to="/">
                  <img
                    src="/android-chrome-192x192.png"
                    alt="Logo"
                    className="w-12 h-12 rounded-full"
                  />
                </Link>
              </div>
              {/* <div>
                <a
                  href="#"
                  className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
                >
                  <span className="font-bold">Brand</span>
                </a>
              </div> */}

              {/* Primary Nav */}
              <div className="hidden md:flex items-center space-x-1">
                {/* <a href="#" className="py-5 px-3">
                  Home
                </a>
                <a href="#" className="py-5 px-3">
                  About
                </a> */}
                {/* More nav items */}
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search"
                className="px-2 py-1 rounded text-black"
              />

              <Button variant="gradient" size="medium">
                Search
              </Button>
            </div>

            {/* Theme Toggle & Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Theme Toggle */}
              <button onClick={() => dispatch(toggleTheme())}>
                {/* Icon or text to represent theme toggle */}
                <span>{theme === "light" ? "🌞" : "🌜"}</span>
              </button>

              {/* Auth Buttons */}

              {tokenAccess ? (
                <Button
                  onClick={() => dispatch(clearToken())}
                  variant="gradient"
                  size="medium"
                >
                  <Link to="/login">Logout</Link>
                </Button>
              ) : (
                <Button variant="gradient" size="medium">
                  <Link to="/login">Login</Link>
                </Button>
              )}
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
          {/* <a href="#" className="block py-2 px-5 text-sm hover:bg-gray-700">
            Home
          </a>
          <a href="#" className="block py-2 px-6 text-sm hover:bg-gray-700">
            About
          </a> */}
          <div className="  md:flex items-center space-x-2 pt-6 pb-2">
            <input
              type="text"
              placeholder="Search"
              className="ml-4 px-2 py-1 rounded text-black"
            />

            <Button variant="gradient" size="medium">
              Search
            </Button>
          </div>
          <div className=" md:flex items-center  ml-4">
            <button className="block" onClick={() => dispatch(toggleTheme())}>
              {/* Icon or text to represent theme toggle */}
              <span>{theme === "light" ? "🌞" : "🌜"}</span>
            </button>

            {tokenAccess ? (
              <Button
                onClick={() => dispatch(clearToken())}
                className="mt-2 ml-[0px] mb-1"
                variant="gradient"
                size="medium"
              >
                <Link to="/login">Logout</Link>
              </Button>
            ) : (
              <Button
                variant="gradient"
                size="medium"
                className="mt-2 ml-['-9px'] mb-1"
              >
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
          {/* More nav items */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

// background: #f2eeee91;
// color: #1f2937;
