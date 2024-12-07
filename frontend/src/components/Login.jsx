import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Login({ setAuthMethod }) {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:9294/api/auth/login', formData,{
        withCredentials: true
      });
      if(res.status === 200){
        toast.success("Login Successfull")
      }
      
    } catch (error) {
      toast.error("Error in signup")
    }finally{
      setIsLoading(false)
    }
    
  }


  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <form className='text-center shadow-lg p-10 border border-[#5f5f5f] rounded-lg' onSubmit={handleSubmit}>
        <h1 className="text-4xl font-semibold text-black mb-4">Enter Credentials</h1> {/* Changed text color to black */}
        <p className="text-lg text-black mb-6">Please enter your email and password to login.</p> {/* Changed text color to black */}

        <label className="input input-bordered flex items-center gap-2 mb-5">
          <input
            type="email"
            className="grow w-[300px]"
            placeholder="Email"
            name='email'
            value={formData.email}
            required
            onChange={handleChange}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          {passwordShow ? 
            <>
              <input type="text" className="grow w-[300px]" placeholder='*****' name='password' value={formData.password} required onChange={handleChange} />
              <FaRegEyeSlash onClick={() => setPasswordShow(!passwordShow)} className='cursor-pointer select-none' />
            </> : 
            <>
              <input type="password" className="grow w-[300px]" placeholder='*****' name='password' value={formData.password} required onChange={handleChange} />
              <FaRegEye onClick={() => setPasswordShow(!passwordShow)} className='cursor-pointer select-none' />
            </>
          }
        </label>

        {isLoading ? 
          <button className="btn mt-4 w-[330px]">
            <span className="loading loading-spinner"></span>
            loading
          </button> : 
          <button type="submit" className="btn mt-4 w-[330px]">Login</button>
        }
      </form>

      <div className="text-center mt-6">
        <p className="text-black"> {/* Changed text color to black */}
          <span className="mr-2">Don't have an account?</span>
          <span
            onClick={() => setAuthMethod("signup")}
            className="text-blue-500 cursor-pointer hover:underline transition-all duration-300"
          >
            Signup here!
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
