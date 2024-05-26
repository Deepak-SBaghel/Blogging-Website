import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../appwrite/auth";
import { logout } from "../../store/features/auth/authSlice";
function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    // returns a PROMISE
    authservice.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    onClick={logoutHandler}>
      LogOut
    </button>
  );
}

export default LogoutBtn;

// add catch in logouthandler
