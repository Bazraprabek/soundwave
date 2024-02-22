import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import countryList from "../components/country";
import { axiosInstance } from "../utils/axois";

function Signup() {
  const navigate = useNavigate();
  const [formData, setData] = useState({
    name: "",
    email: "",
    role: "user",
    country: "",
    password: "",
    cpassword: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { name, email, role, country, password, cpassword } = formData;
      console.log(formData);
      if (name && email && password && role) {
        if (password === cpassword) {
          const res = await axiosInstance.post("/api/user/signup", {
            name,
            email,
            role,
            country,
            password,
          });
          if (res.data.status === "success") {
            alert(res.data.msg);
            navigate("/login");
          } else {
            alert(res.data.msg);
          }
        } else {
          alert("Password not match");
        }
      } else {
        alert("Please fill all fields");
      }
    } catch (err) {
      alert("Signup Fail");
    }
  };
  return (
    <>
      <section id="auth" className="text-center py-4">
        <img src="img/auth.png" alt="logo" width="200rem" />
        {/* <hr /> */}
        <form className="box" method="post" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              <strong>What should we call you?</strong>
            </label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={handleInput}
              name="name"
              id="name"
              placeholder="Enter Profile Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>What's your email?</strong>
            </label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={handleInput}
              name="email"
              id="email"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              <strong>What's your role?</strong>
            </label>
            <select
              className="form-select"
              name="role"
              id="role"
              onChange={handleInput}
            >
              <option value="user">User</option>
              <option value="artist">Artist</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              className="form-select"
              name="country"
              id="country"
              onChange={handleInput}
            >
              <option selected value="">
                Select Country
              </option>
              {countryList.map((value) => {
                return <option value={value.toLowerCase()}>{value}</option>;
              })}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <strong>Create a password</strong>
            </label>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              onChange={handleInput}
              name="password"
              id="password"
              placeholder="Enter Password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              <strong>Confirm password</strong>
            </label>
            <input
              type="password"
              className="form-control"
              value={formData.cpassword}
              onChange={handleInput}
              name="cpassword"
              id="cpassword"
              placeholder="Confirm Password"
            />
          </div>
          <div className="mb-3 text-center">
            <button type="submit">Signup</button>
          </div>
          <div className="mb-3 text-center">
            <p>
              Already Have Account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

export default Signup;
