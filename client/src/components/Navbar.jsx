import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const { index } = useSelector((state) => state.userData);
  if (index) {
    return (
      <>
        <nav className="navbar nav justify-content-end topnavbar">
          <Link className="nav-link text-light">
            <strong>
              <FontAwesomeIcon icon={faUserCircle} size="lg" />{" "}
              {index.payload.name}
            </strong>
          </Link>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="navbar nav justify-content-end topnavbar">
          <Link className="nav-link btn" to="/signup">
            Signup
          </Link>
          <Link className="nav-link btn btn-light text-dark" to="/login">
            Login
          </Link>
        </nav>
      </>
    );
  }
}

export default Navbar;
