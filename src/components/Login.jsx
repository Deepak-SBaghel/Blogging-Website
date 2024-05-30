import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/features/auth/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // handleSubmit , it is a method on useForm by reacthookform
  // use login method inside it
  const { regester, handleSubmit } = useForm();
  // above both are events / methods
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    // clean all the error while submitting
    try {
      const session = authService.login(data);
      if (session) {
        // will use await bcs , it will extract grom the method getuseddata , backend
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      } else {
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex item-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-5">
          <div className="space-y-5">
            <Input
              label="Email:"
              placeholder="Enter Your email"
              type="email"
              // this is  specfically for the useForm
              // this email ⬇️ is  unique ( it is a key)
              // and also pass the options with is like req , val . read from doc(optional)
              // u have to spread , it is the syntax
              {...regester("email", {
                required: true,
                validite: {
                  matchPatern: (value) =>
                    // rege x , regular expression
                    // for verification
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Email adress must be valid",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...regester("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;