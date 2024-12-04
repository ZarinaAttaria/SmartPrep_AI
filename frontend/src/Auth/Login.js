import React from "react";
import { setPassword, setUserName } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../styles/LoginStyles.css";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const userName = useSelector((state) => state.auth.userName);
  const password = useSelector((state) => state.auth.password);

  const dispatch = useDispatch();

  const handleUserNameChange = (e) => {
    dispatch(setUserName(e.target.value));
  };

  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/users/login`,
        {
          username: userName,
          password,
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }
      );
      console.log("Login successful", response.data);
      toast.success("Login Successfull!");
      localStorage.setItem('currentUser', JSON.stringify(response.data));
    } catch (error) {
      console.log(error.response?.data?.message || "Login Unsuccessful");
      console.log("Login Error", error);
      toast.error("Login Unsuccessfull");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="form-box">
        <div className="header-text">Login Form</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={handleUserNameChange}
            value={userName}
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={handlePasswordChange}
            value={password}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
