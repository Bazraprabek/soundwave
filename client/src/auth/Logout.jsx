import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      await axios.get("http://localhost:5000/api/user/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    }
    fetchData();
    navigate("/login");
    window.location.reload();
  });
  return <div></div>;
}

export default Logout;
