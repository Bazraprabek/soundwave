import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRightFromBracket,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

const Admin_Sidebar = () => {
  return (
    <>
      <nav className="navbar sidebar bg-danger">
        <Link
          activeclassname="active"
          to="/"
          className="d-flex flex-row pt-2 pb-3 justify-content-center text-center"
          title="SoundWave"
        >
          <img src="/img/logo.png" width="60px" alt="logo" />
          <h5 className="mt-2 icon">SoundWave</h5>
        </Link>
        <ul className="nav">
          <li className="nav-item">
            <Link
              activeclassname="active"
              title="Home"
              className="nav-link"
              to="/"
            >
              <FontAwesomeIcon icon={faHome} />{" "}
              <span className="icon">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              activeclassname="active"
              title="Songs"
              className="nav-link"
              to="/songs"
            >
              <FontAwesomeIcon icon={faMusic} />{" "}
              <span className="icon">Songs</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              activeclassname="active"
              title="Logout"
              className="nav-link"
              to="/logout"
            >
              <FontAwesomeIcon icon={faRightFromBracket} color="black" />{" "}
              <span className="icon text-black">Logout</span>
            </Link>
          </li>
        </ul>
        {/* <p className='mt-auto'>
            &copy; Englishcha
        </p> */}
      </nav>
    </>
  );
};

export default Admin_Sidebar;
