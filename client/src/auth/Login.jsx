import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axois";

function Login({ setloggedIn }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setData] = useState({
    email: "",
    password: "",
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
      const { email, password } = formData;
      if (email && password) {
        setLoading(true);
        const res = await axiosInstance.post("/api/user/login", {
          email,
          password,
        });
        setLoading(false);
        console.log(res.data);
        if (res.data.status === "success") {
          localStorage.setItem("token", JSON.stringify(res.data.accessToken));
          setloggedIn(true);
          navigate("/");
        } else {
          alert(res.data.msg);
        }
      } else {
        alert("Please fill all fields");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Login Fail");
    }
  };

  return (
    <>
      <section id="auth" className="text-center py-4">
        <img src="img/auth.png" alt="logo" width="200rem" />
        {/* <hr /> */}
        <form className="box" method="post" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email address</strong>
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
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
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
          <div className="mb-4 text-center">
            {loading ? (
              <button className="form-control" type="submit" disabled>
                LOADING...
              </button>
            ) : (
              <button className="form-control" type="submit">
                LOG IN
              </button>
            )}
          </div>
          <hr />
          <div className="py-4 text-center">
            <h5>Don't Have Account?</h5>
          </div>
          <div className="mb-3 text-center">
            <Link className="form-control abtn" to="/signup">
              SIGN UP FOR SOUNDWAVE
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
