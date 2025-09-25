import React, { useState } from 'react'
import {
  FiSearch,
  FiMoon,
  FiSun,
  FiLogOut,
  FiSettings,
  FiFilter
} from 'react-icons/fi'
import { KanbanFlow } from '../Logo/KanbanFlow'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../FirebaseAuth/fireBaseAuth'
import { useAuth } from '../../context/AuthContext'

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const [openMenu, setOpenMenu] = useState(false)
  const [openFilters, setOpenFilters] = useState(false)

  const [selectedPriority, setSelectedPriority] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(null)

  const priorities = ['High', 'Medium', 'Low']
  const statuses = ['Overdue', 'Completed']

  const { user } = useAuth()
  const name =
    user?.displayName || (user?.email ? user.email.split('@')[0] : 'User')

  const togglePriority = p =>
    setSelectedPriority(prev => (prev === p ? null : p))
  const toggleStatus = s => setSelectedStatus(prev => (prev === s ? null : s))
  const clearFilters = () => {
    setSelectedPriority(null)
    setSelectedStatus(null)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      console.log('User signed out')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav
      className={`flex items-center gap-4 px-6 py-3 shadow-md border-b border-gray-700 ${
        isDark
          ? 'bg-[var(--color-bg-dark)] text-[var(--color-text-dark)]'
          : 'bg-[var(--color-bg-light)] text-[var(--color-text-light)]'
      }`}
    >
      {/* Logo */}
      <div className='flex items-center'>
        <KanbanFlow />
      </div>

      {/* Search */}
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-md border ${
          isDark
            ? 'border-[var(--color-border-dark)]'
            : 'border-[var(--color-border-light)]'
        }`}
      >
        <FiSearch className='text-gray-400' />
        <input
          type='search'
          placeholder='Search Boards'
          className={`bg-transparent focus:outline-none text-md ${
            isDark
              ? 'text-[var(--color-text-dark)]'
              : 'text-[var(--color-text-light)]'
          }`}
        />
      </div>

      <div className='flex-1' />

      {/* Filter dropdown */}
      <div className='relative hidden md:block'>
        <button
          onClick={() => setOpenFilters(!openFilters)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition ${
            isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
          }`}
        >
          <FiFilter /> Filters
        </button>

        {openFilters && (
          <div
            className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg p-4 text-sm z-20 ${
              isDark ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'
            }`}
          >
            {/* Priority */}
            <div className='mb-4'>
              <p className='text-xs mb-2 text-gray-400'>Priority</p>
              <div className='flex gap-2 flex-wrap'>
                {priorities.map(p => (
                  <button
                    key={p}
                    onClick={() => togglePriority(p)}
                    className={`px-2 py-1 rounded-md text-xs transition ${
                      selectedPriority === p
                        ? isDark
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-200 text-gray-900'
                        : isDark
                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                        : 'hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className='mb-4'>
              <p className='text-xs mb-2 text-gray-400'>Status</p>
              <div className='flex gap-2 flex-wrap'>
                {statuses.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleStatus(s)}
                    className={`px-2 py-1 rounded-md text-xs transition ${
                      selectedStatus === s
                        ? isDark
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-200 text-gray-900'
                        : isDark
                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                        : 'hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={clearFilters}
              className='text-xs text-gray-400 hover:underline'
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg transition ${
          isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
        }`}
        aria-label='Toggle theme'
      >
        {isDark ? <FiSun /> : <FiMoon />}
      </button>

      {/* User menu */}
      <div className='relative'>
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className='flex items-center gap-2'
        >
          <img
            src='https://i.pravatar.cc/40'
            alt='User'
            className='w-8 h-8 rounded-full'
          />
          <p className='hidden md:block'>{name}</p>
        </button>

        {openMenu && (
          <div
            className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg text-sm ${
              isDark ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'
            }`}
          >
            <Link
              to='/settings'
              className={`flex items-center gap-2 px-3 py-2 ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
              }`}
            >
              <FiSettings /> Board Settings
            </Link>
            <button
              onClick={handleLogout}
              className={`w-full text-left flex items-center gap-2 px-3 py-2 ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
              }`}
            >
              <FiLogOut /> Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
