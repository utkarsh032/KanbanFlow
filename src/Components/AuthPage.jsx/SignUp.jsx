import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../../services/authService'

export default function SignUp () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const navigate = useNavigate()

  const handleRegister = async e => {
    e.preventDefault()
    try {
      await signup(email, password)
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
          <h2 className='text-2xl font-semibold text-gray-200'>
            Create account
          </h2>
          <p className='text-sm text-gray-400'>
            Sign up to get started with KanbanFlow
          </p>
        </div>

        {/* Form */}
        <form className='space-y-4' onSubmit={handleRegister}>
          <input
            className='w-full border border-gray-600 rounded-md px-3 py-2 bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500'
            type='text'
            placeholder='Full Name'
            required
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
          <input
            className='w-full border border-gray-600 rounded-md px-3 py-2 bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500'
            type='email'
            placeholder='Email address'
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className='w-full border border-gray-600 rounded-md px-3 py-2 bg-transparent text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500'
            type='password'
            placeholder='Password'
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            className='w-full bg-gray-200 text-gray-900 py-2 rounded-md hover:bg-gray-300 transition'
            type='submit'
          >
            Create account
          </button>
        </form>

        {/* Footer */}
        <p className='mt-4 text-center text-sm text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/sign-in'
            className='text-gray-200 font-medium hover:underline'
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
