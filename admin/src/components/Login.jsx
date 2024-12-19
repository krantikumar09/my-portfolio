import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (res.data.success) {
        setToken(res.data.token);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="max-w-md w-full shadow-xl rounded-sm p-7">
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
            <h5 className="text-xl font-bold text-black mb-4">Admin Login</h5>
            <label className="input input-bordered flex items-center gap-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                className="grow text-base text-black"
                placeholder="Username"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="grow"
                placeholder="Password"
              />
            </label>

            <button className="btn btn-md bg-black text-white text-base font-medium hover:bg-black">
              Login
            </button>
          </form>
        </div>
      </div>
  );
};

export default Login;
