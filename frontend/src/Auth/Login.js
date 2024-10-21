import React from "react";
import { setUserName } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const userName = useSelector((state) => state.auth.userName);
  const dispatch = useDispatch();
  const handleUserNameChange = (e) => {
    dispatch(setUserName(e.target.value));
  };
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Enter Username"
          onChange={handleUserNameChange}
          value={userName}
        />
        <input type="password" placeholder="Enter Password" />
      </form>
    </div>
  );
};

export default Login;
