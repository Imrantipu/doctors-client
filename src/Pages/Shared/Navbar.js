import React, { useContext } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/sitelogo.png";
import SwitchTheme from "../../components/SwitchTheme";
import { AuthContext } from "../../contexts/AuthProvider";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const menuItems = (
    <>
      {/* <li>
        <Link to ="/">Home</Link>
      </li> */}
      <li>
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
        </Link>
      </li>
      <li>
        <Link to="/appointment">Appointment</Link>
      </li>
      {user?.uid ? (
        <li>
          <Link to="/">Sign Out</Link>
        </li>
      ) : (
        <>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </>
      )}

      <li>
        <div>
          <SwitchTheme></SwitchTheme>
        </div>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar  rounded-xl">
        <div className="navbar-start">
          <Link to="/" className="btn btn-primary normal-case text-2xl ">
            <div className="w-10 rounded-full">
              <img src={img} alt="" />
            </div>
            dentalService
          </Link>
        </div>

        <div className="navbar-end">
          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow  rounded-box w-52 bg-secondary-focus"
            >
              {menuItems}
            </ul>
          </div>
        </div>

        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
