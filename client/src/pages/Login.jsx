import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Cookies from "js-cookie";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [registered, setRegistered] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (data) => {
    const { email, password } = data;
    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });
      const userData = response.data;
      dispatch(setCredentials(userData.user));
      reset();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const registerHandler = async (data) => {
    const { name, email, password } = data;
    try {
      const response = await axios.post("http://localhost:5000/api/user/register", {
        name,
        email,
        password,
      });
      const token = response.data.token;

      Cookies.set("token", token, { expires: 1 });
      reset();
      toast.success(response.data.message);
      setRegistered(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    // user && navigate("/dashboard");
  }, [user]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] ">
      <img
        className="absolute bottom-[5vh] left-[5vw] rotate-4 lg:w-1/6 md:w-2/6 w-4/6  object-cover object-center rounded"
        alt="hero"
        src="https://cdn3d.iconscout.com/3d/premium/thumb/test-result-verified-11032329-8842078.png?f=webp"
      />
      <img
        className="absolute right-[40vw] bottom-[4vh] lg:w-1/6 md:w-2/6 w-4/6  object-cover object-center rounded"
        alt="hero"
        src="https://cdn3d.iconscout.com/3d/premium/thumb/task-management-4721296-3931550.png?f=webp"
      />
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* left side */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600">
              Manage all your task in one place!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>TaskHub</span>
              <span className="text-[6vh]">Your Personal Task Manager</span>
            </p>

            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className=" form-container  bg-white w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center pb-7 ">
          {registered ? (
            <form
              onSubmit={handleSubmit(loginHandler)}
              className="w-full md:w-[400px] flex flex-col gap-y-8 px-10 pt-14 pb-4"
            >
              <div className="">
                <p className="text-blue-600 text-3xl font-bold text-center">Welcome back!</p>
                <p className="text-center text-base text-gray-700 ">Lets Organize all your Tasks.</p>
              </div>

              <div className="flex flex-col gap-y-5">
                <Textbox
                  placeholder="email@example.com"
                  type="email"
                  name="email"
                  label="Email Address"
                  className="w-full rounded-full"
                  register={register("email", {
                    required: "Email Address is required!",
                  })}
                  error={errors.email ? errors.email.message : ""}
                />
                <Textbox
                  placeholder="your password"
                  type="password"
                  name="password"
                  label="Password"
                  className="w-full rounded-full"
                  register={register("password", {
                    required: "Password is required!",
                  })}
                  error={errors.password ? errors.password.message : ""}
                />

                <Button type="submit" label="Submit" className="w-full h-12 bg-blue-700 text-white rounded-full" />
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(registerHandler)}
              className="w-full md:w-[400px] flex flex-col gap-y-8 px-10 pt-14 pb-4"
            >
              <div className="">
                <p className="text-blue-600 text-3xl font-bold text-center">Welcome!</p>
                <p className="text-center text-base text-gray-700 ">Register Yourself to get Organized.</p>
              </div>

              <div className="flex flex-col gap-y-5">
                <Textbox
                  placeholder="Username"
                  type="text"
                  name="name"
                  label="User Name"
                  className="w-full rounded-full"
                  register={register("name", {
                    required: "Name is required!",
                  })}
                  error={errors.email ? errors.email.message : ""}
                />
                <Textbox
                  placeholder="email@example.com"
                  type="email"
                  name="email"
                  label="Email Address"
                  className="w-full rounded-full"
                  register={register("email", {
                    required: "Email Address is required!",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address format",
                    },
                  })}
                  error={errors.email ? errors.email.message : ""}
                />
                <Textbox
                  placeholder="your password"
                  type="password"
                  name="password"
                  label="Password"
                  className="w-full rounded-full"
                  register={register("password", {
                    required: "Password is required!",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    // Add other password validation rules as needed
                  })}
                  error={errors.password ? errors.password.message : ""}
                />

                <Button type="submit" label="Submit" className="w-full h-12 bg-blue-700 text-white rounded-full" />
              </div>
            </form>
          )}
          {registered ? (
            <p className="text-center text-base text-gray-700 mb-10">
              Don't have an account? <button onClick={() => setRegistered(false)}> Signup</button>
            </p>
          ) : (
            <p className="text-center text-base text-gray-700 mb-10">
              Already have an account? <button onClick={() => setRegistered(true)}> Login</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
