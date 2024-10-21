import React from "react";
import axios from "axios";
import { setPassword, setUserName, setEmail } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Signup.css";

export default function Signup() {
  const userName = useSelector((state) => state.auth.userName);
  const password = useSelector((state) => state.auth.password);
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/users/signup",
        {
          username: userName,
          email,
          password,
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }
      );
      toast.success("Signup Successfully.");
    } catch (error) {
      toast.error("Failed to SignUp.");
    }
  };
  return (
    <>
      <ToastContainer />

      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <div className="header-text">SignUp Form</div>
          <input
            placeholder="Your Username"
            type="text"
            value={userName}
            onChange={(e) => dispatch(setUserName(e.target.value))}
          />
          <input
            placeholder="Your Email Address"
            type="email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
          <input
            placeholder="Your Password"
            type="password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
          <button type="submit">SignUp</button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
