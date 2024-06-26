import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/features/auth/authSlice";
import {Header,Footer} from "./components/index"
import { Outlet } from 'react-router-dom'

function App() {
  // loading
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log(userData);
          dispatch(login({ userData }));
        } else {
          dispatch(
            logout()
            // if the user is not logedin , u still call loged out
            // just so the state gets updated and show log out
          );
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between m-0 p-0">
      <div className="w-full block bg-white">
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null;
}

export default App;

// assinment:
// add loading svg here
// add catch in getCurrentUser
