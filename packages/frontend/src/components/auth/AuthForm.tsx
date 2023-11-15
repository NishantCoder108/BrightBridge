// src/components/auth/LoginForm.tsx
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormData, AuthSchema } from "../../utils/authValidation";
import { loginUser, signupUser } from "../../api/services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/authSlice";

const AuthForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
  });

  const [isSignup, setIsSignUp] = useState<boolean>(false);
  const [errResponse, setErrResponse] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
    const { email, password } = data;

    const authApi = isSignup
      ? signupUser(email, password)
      : loginUser(email, password);

    try {
      const userData = await authApi;
      console.log({ userData });
      dispatch(setToken(userData));
      navigate("/");
    } catch (error) {
      console.error(error);
      let errorMessage = "Unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setErrResponse(errorMessage);
    }
  };

  const handleLoginForm = () => {
    setIsSignUp(!isSignup);
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-gray-300">
      <div className="p-6  rounded-md  ">
        <div className="flex justify-center items-center mb-6">
          <img
            src="/android-chrome-192x192.png"
            alt="Logo"
            className="w-20 h-20 rounded-full"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full px-4 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {errors.email && (
              <p className="text-red-500 text-xs italic ">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full px-4 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>{" "}
          {errResponse && (
            <p className="text-red-500 text-xs text-center italic">
              {errResponse}
            </p>
          )}
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            {!isSignup ? "If you are a new user," : "If you are already user,"}

            <span
              onClick={handleLoginForm}
              className="text-blue-500 hover:text-blue-600 ml-1 cursor-pointer"
            >
              {!isSignup ? "sign up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
