import React, { useState } from "react";
import authServce from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  // useNavigate used to add page or remove page from url
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  //  both are events / methods
  const [regester, handleSubmit] = useForm();
  const create = async (data) => {
    setError("");
    try {
      const userData = await authServce.createAccount(data);
      if (userData) {
        const userData = await authServce.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      // if the page crashes
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name:"
              placeholder="Enter Your Full Name"
              {...regester("name", {
                reqired: true,
              })}
            />
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
              placeholder="Enter Your Password"
              {...regester("password", {
                reqired: true,
              })}
            />
            <Button
            type="submit"
            className="w-full"
            />
            <Button/>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;