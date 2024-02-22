import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faBook,
  faRightFromBracket,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  return (
    <>
      <nav className="navbar sidebar ">
        <Link
          to="/"
          className="d-flex flex-row pt-2 pb-3 justify-content-center text-center"
          title="SoundWave"
        >
          <img src="/img/logo.png" width="60px" alt="logo" />
          <h5 className="mt-2 icon">SoundWave</h5>
        </Link>
        <ul className="nav">
          <li className="nav-item">
            <NavLink
              activeclassname="active"
              title="Home"
              className="nav-link"
              to="/"
            >
              <FontAwesomeIcon icon={faHome} />{" "}
              <span className="icon">Home</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeclassname="active"
              title="Searh"
              className="nav-link"
              to="/search"
            >
              <FontAwesomeIcon icon={faSearch} />{" "}
              <span className="icon">Search</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeclassname="active"
              title="Your Library"
              className="nav-link"
              to="/library"
            >
              <FontAwesomeIcon icon={faBook} />{" "}
              <span className="icon">Your Library</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeclassname="active"
              title="Explore"
              className="nav-link"
              to="/explore"
            >
              <FontAwesomeIcon icon={faCompass} />{" "}
              <span className="icon">Explore</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeclassname="active"
              title="Logout"
              className="nav-link"
              to="/logout"
            >
              <FontAwesomeIcon icon={faRightFromBracket} color="red" />{" "}
              <span className="icon text-danger">Logout</span>
            </NavLink>
          </li>
        </ul>
        {/* <p className='mt-auto'>
                &copy; Englishcha
            </p> */}
      </nav>
    </>
  );
}

export default Sidebar;
