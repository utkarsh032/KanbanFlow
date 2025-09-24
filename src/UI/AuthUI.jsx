import React from 'react'
import { AuthBaseFlow } from '../Components/AuthBaseFlow'
import { Outlet } from 'react-router-dom'

export default function AuthUI () {
  return (
    <div className='flex  '>
      <div className='w-1/2 hidden md:block'>
        <AuthBaseFlow />
      </div>
      <div className='w-full md:w-1/2 flex items-center justify-center'>
        <Outlet />
      </div>
    </div>
  )
}
