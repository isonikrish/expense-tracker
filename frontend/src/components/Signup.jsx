import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import toast from 'react-hot-toast';
import axios from 'axios';


function Signup({ setAuthMethod }) {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:9294/api/auth/signup', formData,{
        withCredentials: true
      });
      if(res.status === 200){
        toast.success("Signup Successfull")
      }
      
    } catch (error) {
      toast.error("Error in signup")
    }finally{
      setIsLoading(false)
    }
    
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form className="text-center shadow-lg p-10 border border-[#5f5f5f] rounded-lg" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-semibold text-black mb-6">Create Account</h1>
        <p className="text-lg text-black mb-6">Please enter your username, email, and password to signup.</p>

        <label className="input input-bordered flex items-center gap-2 mb-5">
          <input
            type="text"
            className="grow w-[300px]"
            placeholder="Username"
            name="username"
            value={formData.username}
            required
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-5">
          <input
            type="text"
            className="grow w-[300px]"
            placeholder="Email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          {passwordShow ? (
            <>
              <input
                type="text"
                className="grow w-[300px]"
                placeholder="*****"
                name="password"
                value={formData.password}
                required
                onChange={handleChange}
              />
              <FaRegEyeSlash onClick={() => setPasswordShow(!passwordShow)} className="cursor-pointer select-none" />
            </>
          ) : (
            <>
              <input
                type="password"
                className="grow w-[300px]"
                placeholder="*****"
                name="password"
                value={formData.password}
                required
                onChange={handleChange}
              />
              <FaRegEye onClick={() => setPasswordShow(!passwordShow)} className="cursor-pointer select-none" />
            </>
          )}
        </label>

        {isLoading ? (
          <button className="btn mt-4 w-[330px]">
            <span className="loading loading-spinner"></span>
            loading
          </button>
        ) : (
          <button className="btn mt-4 w-[330px]">Signup</button>
        )}
      </form>
      <div className="text-center mt-6">
        <p className="text-black">
          <span className="mr-2">Already have an account?</span>
          <span
            onClick={() => setAuthMethod("login")}
            className="text-blue-500 cursor-pointer hover:underline transition-all duration-300"
          >
            Login here!
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
