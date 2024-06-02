import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter } from "react-router-dom";
// import { AuthLayout, Login, Signup } from "./components/index.js";
import {AddPost,AllPosts,EditPost,Home,Post,Login,Signup}from"../src/components/Pages/index.js"

import AllPost from "../"
const router = createBrowserRouter([
  {
    path: "/",
    element: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <AuthLayout authentication={false}><Login/></AuthLayout>,
        // use parenthesis when u want to pass more than 2 elements
      },
      {
        path: "/signup",
        element: <AuthLayout authentication={false}><Signup/></AuthLayout>,
      },
      {
        path: "/all-posts",
        element: <AuthLayout authentication>{" "}<AllPosts/></AuthLayout>,
      },      {
        path: "/add-post",
        element: <AuthLayout authentication>{" "}<AddPost/></AuthLayout>,
      },      {
        path: "/edit-post/:slug",
        element: <AuthLayout authentication>{" "}<EditPost/></AuthLayout>,
      },      {
        path: "/post/:slug",
        element: <AuthLayout authentication>{" "}<Post/></AuthLayout>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvder router={router}>

      <App />
      </RouterProvder>
    </Provider>
  </React.StrictMode>
);
