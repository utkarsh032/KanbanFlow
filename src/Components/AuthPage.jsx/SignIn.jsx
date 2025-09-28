import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri'
import { TfiEmail } from 'react-icons/tfi'

export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-4'>
      <div className='w-full max-w-sm border border-gray-700 rounded-xl shadow-md p-8 bg-[#111]'>
        {/* Heading */}
        <div className='text-center mb-6'>
          <h2 className='text-2xl font-semibold text-gray-200'>Welcome back</h2>
          <p className='text-sm text-gray-400'>
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <form className='space-y-4' onSubmit={handleLogin}>
          {/* Email */}
          <div className='flex gap-2 items-center w-full border border-gray-600 rounded-md px-3 py-2 bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500'>
            <input
              className='border-none bg-transparent w-full focus:outline-none'
              type='email'
              placeholder='Email address'
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TfiEmail className='text-gray-400' />
          </div>

          {/* Password */}
          <div className='flex items-center gap-2 w-full border border-gray-600 rounded-md px-3 py-2 bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500'>
            <input
              className='border-none bg-transparent w-full focus:outline-none'
              type={showPassword ? 'text' : 'password'} // 👈 toggle type
              placeholder='Password'
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type='button'
              className='text-gray-400'
              onClick={() => setShowPassword(prev => !prev)} // 👈 toggle handler
            >
              {showPassword ? <RiEyeFill /> : <RiEyeCloseFill />}
            </button>
          </div>

          {/* Submit */}
          <button
            className='w-full bg-gray-200 text-gray-900 py-2 rounded-md hover:bg-gray-300 transition'
            type='submit'
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className='mt-4 text-center text-sm text-gray-400'>
          Don't have an account?{' '}
          <Link
            to='/sign-up'
            className='text-gray-200 font-medium hover:underline'
          >
            Sign Up
          </Link>
        </p>

        {/* Demo credentials */}
        <div className='mt-6 p-3 border border-gray-700 rounded-md text-sm text-gray-300 bg-[#0d0d0d]'>
          <p className='font-medium mb-1 text-sm'>Demo credentials:</p>
          <code className='block'>demo@kanbanflow.com / demo123</code>
        </div>
      </div>
    </div>
  )
}
