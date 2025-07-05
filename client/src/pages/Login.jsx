import React, { useState } from 'react';
import { Mail, Lock, ArrowUpRight } from 'lucide-react';
import useAuth from '../store/authStore';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoginning } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  };

  return (
    <div className='w-full min-h-screen flex flex-col lg:flex-row items-center justify-center bg-base-200'>
      {/* Left Section */}
      <div className='w-full lg:w-1/2 h-full flex flex-col items-start justify-center p-10 lg:p-20 space-y-3 text-center lg:text-left'>
        <h1 className='font-[playfair-display] text-4xl italic'>Login</h1>
        <h1 className='text-5xl lg:text-7xl font-bold font-[inter] uppercase'>Welcome Back</h1>
        <p className='font-[inter] text-sm lg:text-base'>
          Sign back in to your account to access your courses and embody the art of being human.
        </p>
      </div>

      {/* Right Section */}
      <div className='w-full lg:w-1/2 h-full bg-base-content text-base-300 flex flex-col items-center lg:items-start justify-center px-6 py-10 lg:px-20 lg:py-10 gap-5'>
        <h1 className='font-[inter] text-3xl lg:text-4xl font-bold text-accent uppercase'>Your Account</h1>
        <form onSubmit={handleSubmit} className='w-full max-w-md flex flex-col space-y-4 font-[inter]'>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-xl lg:text-2xl font-bold'>Email</span>
            </label>
            <input
              type='email'
              placeholder='Enter your email'
              className='input input-neutral bg-base-content w-full p-4 lg:p-6'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-xl lg:text-2xl font-bold'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter your password'
              className='input input-neutral bg-base-content w-full p-4 lg:p-6'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='btn btn-accent w-full mt-4 p-4 lg:p-6'
            disabled={isLoginning}
          >
            {isLoginning ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 w-full max-w-md flex flex-col items-center border-t py-4 relative">
          <div className='absolute -top-[5px] right-0 w-[10px] h-[10px] bg-accent'></div>
          <div className='absolute -top-[5px] left-0 w-[10px] h-[10px] bg-accent'></div>
          <span className="text-sm lg:text-lg font-[inter] text-center">
            <Link to="/register" className="ml-2 text-accent underline hover:text-accent-focus uppercase flex items-center gap-2">
              Create an account <ArrowUpRight strokeWidth={1} />
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
