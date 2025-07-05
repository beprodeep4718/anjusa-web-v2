import React, { useState } from 'react';
import useAuth from '../store/authStore';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  });
  const { register, isRegistering } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, phone } = form;
    if (username && email && password && phone) {
      register(username, email, password, phone);
    }
  };

  return (
    <div className='w-full min-h-screen flex flex-col lg:flex-row items-center justify-center bg-base-200'>
      {/* Left section */}
      <div className='w-full lg:w-1/2 h-full flex flex-col items-start justify-center p-10 lg:p-20 space-y-3 text-center lg:text-left'>
        <h1 className='font-[playfair-display] text-4xl italic'>Register</h1>
        <h1 className='text-5xl lg:text-7xl font-bold font-[inter] uppercase'>
          Create <span className='font-[playfair-display] font-light italic text-3xl lg:text-4xl lowercase'>an</span> Account
        </h1>
        <p className='font-[inter] text-sm lg:text-base'>
          Create your account to begin your journey of learning and growth.
        </p>
      </div>

      {/* Right section */}
      <div className='w-full lg:w-1/2 h-full bg-base-content text-base-300 flex flex-col items-center lg:items-start justify-center px-6 py-10 lg:px-20 lg:py-10 gap-5 lg:rounded-tl-lg lg:rounded-bl-lg shadow-lg'>
        <form onSubmit={handleSubmit} className='w-full max-w-md flex flex-col space-y-4 font-[inter]'>
          
          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-xl lg:text-2xl font-bold'>Username</span>
            </label>
            <input
              type='text'
              name='username'
              placeholder='Enter your username'
              className='input input-neutral bg-base-content w-full p-4 lg:p-6'
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-xl lg:text-2xl font-bold'>Email</span>
            </label>
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              className='input input-neutral bg-base-content w-full p-4 lg:p-6'
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-xl lg:text-2xl font-bold'>Password</span>
            </label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              className='input input-neutral bg-base-content w-full p-4 lg:p-6'
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-xl lg:text-2xl font-bold'>Phone</span>
            </label>
            <input
              type='tel'
              name='phone'
              placeholder='Enter your phone number'
              className='input input-neutral bg-base-content w-full p-4 lg:p-6'
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <button type='submit' className='btn btn-accent w-full mt-4 p-4 lg:p-6' disabled={isRegistering}>
            {isRegistering ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-4 w-full max-w-md flex flex-col items-center border-t py-4 relative">
          <div className='absolute -top-[5px] right-0 w-[10px] h-[10px] bg-accent'></div>
          <div className='absolute -top-[5px] left-0 w-[10px] h-[10px] bg-accent'></div>
          <span className="text-sm lg:text-lg font-[inter] text-center">
            Already have an account?
            <Link to="/login" className="ml-2 text-accent underline hover:text-accent-focus inline-flex items-center gap-1">
              Log in <ArrowUpRight strokeWidth={1} />
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
