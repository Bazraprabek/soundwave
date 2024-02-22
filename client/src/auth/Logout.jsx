import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.removeItem("token");
      navigate("/login");
      window.location.reload();
    } else {
      navigate("/login");
      window.location.reload();
    }
  }, []);

  return null;
};

export default Logout;
