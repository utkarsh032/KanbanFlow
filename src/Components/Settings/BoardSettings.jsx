import React, { useState } from 'react'

export default function BoardSettings ({ user, history, onUpdateUser }) {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    onUpdateUser(formData) // call parent or API
  }

  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>⚙️ Board Settings</h2>

      {/* User Profile Section */}
      <div className='bg-white shadow-md rounded-xl p-4 mb-6'>
        <h3 className='text-xl font-semibold mb-2'>User Profile</h3>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block font-medium'>Username</label>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              className='w-full border rounded-lg px-3 py-2'
            />
          </div>
          <div>
            <label className='block font-medium'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full border rounded-lg px-3 py-2'
            />
          </div>
          <button
            type='submit'
            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* History Section */}
      <div className='bg-white shadow-md rounded-xl p-4'>
        <h3 className='text-xl font-semibold mb-2'>📜 Activity History</h3>
        {history?.length > 0 ? (
          <ul className='list-disc list-inside text-gray-700'>
            {history.map((item, index) => (
              <li key={index} className='mb-1'>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-500'>No activity yet.</p>
        )}
      </div>
    </div>
  )
}
