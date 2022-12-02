import { signIn } from "next-auth/react";
import React from "react";
import { FcReading } from "react-icons/fc";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <FcReading size="100" />
      </div>
      <a
        onClick={signIn}
        className="px-20 py-4 z-10 text-2xl cursor-pointer mt-16 bg-blue-500 rounded-md text-white"
      >
        Login
      </a>
    </div>
  );
};

export default Login;
