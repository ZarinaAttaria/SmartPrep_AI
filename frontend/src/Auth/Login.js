import React from "react";
import { setPassword, setUserName } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
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
  return (
    <div>
      <form>
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
        />
      </form>
    </div>
  );
};

export default Login;
