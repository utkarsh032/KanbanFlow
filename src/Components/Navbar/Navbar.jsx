import React, { useState, useEffect, useRef } from 'react'
import {
  FiSearch,
  FiMoon,
  FiSun,
  FiLogOut,
  FiSettings,
  FiFilter,
  FiMenu,
  FiX
} from 'react-icons/fi'
import { KanbanFlowLogo } from '../Logo/KanbanFlowLogo'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useFilter } from '../../context/useFilter'
import { signOut } from 'firebase/auth'
import { auth } from '../../FirebaseAuth/fireBaseAuth'
import { useAuth } from '../../context/AuthContext'

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const filterMenuRef = useRef(null)
  const profileMenuRef = useRef(null)

  const {
    selectedPriority,
    togglePriority,
    selectedStatus,
    toggleStatus,
    searchQuery,
    setSearchQuery,
    clearFilters
  } = useFilter()

  const priorities = ['High', 'Medium', 'Low']
  const statuses = ['Overdue', 'Completed', 'In Progress']

  const { user } = useAuth()
  const name =
    user?.displayName || (user?.email ? user.email.split('@')[0] : 'User')
  const userInitial = name.charAt(0).toUpperCase()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setIsProfileMenuOpen(false)
      console.log('User signed out')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Handle resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(e.target)) {
        setIsFilterMenuOpen(false)
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 md:px-6 shadow-lg border-b z-50 transition-colors ${
          isDark
            ? 'bg-[var(--color-bg-dark)] text-[var(--color-text-dark)] border-gray-700'
            : 'bg-[var(--color-bg-light)] text-[var(--color-text-light)] border-gray-300'
        }`}
      >
        {/* Left Section: Logo & Search */}
        <div className='flex items-center gap-4 flex-1 min-w-0'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <KanbanFlowLogo />
          </div>

          {/* Search Bar - Hidden on mobile, visible on tablet+ */}
          <div
            className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-md border flex-1 max-w-xs ${
              isDark
                ? 'border-gray-700 bg-gray-900'
                : 'border-gray-300 bg-gray-100'
            }`}
          >
            <FiSearch className='text-gray-500 flex-shrink-0' size={18} />
            <input
              type='search'
              placeholder='Search boards...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={`bg-transparent focus:outline-none text-sm w-full ${
                isDark
                  ? 'text-[var(--color-text-dark)] placeholder-gray-500'
                  : 'text-[var(--color-text-light)] placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Center/Right Section: Controls */}
        <div className='flex items-center gap-2 md:gap-4'>
          {/* Filter Button - Desktop */}
          <div ref={filterMenuRef} className='relative hidden md:block'>
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDark
                  ? 'hover:bg-gray-800 text-gray-200'
                  : 'hover:bg-gray-100 text-gray-700'
              } ${selectedPriority || selectedStatus ? (isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700') : ''}`}
              title='Open filters'
            >
              <FiFilter size={18} />
              <span className='hidden lg:inline'>Filters</span>
            </button>

            {/* Filter Dropdown */}
            {isFilterMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-64 rounded-lg shadow-xl p-4 text-sm z-20 border ${
                  isDark
                    ? 'bg-gray-900 text-gray-200 border-gray-700'
                    : 'bg-white text-gray-800 border-gray-200'
                }`}
              >
                {/* Priority */}
                <div className='mb-4'>
                  <p className='text-xs font-semibold mb-2 uppercase tracking-wider text-gray-500'>
                    Priority
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {priorities.map(p => (
                      <button
                        key={p}
                        onClick={() => togglePriority(p)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                          selectedPriority === p
                            ? isDark
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-500 text-white'
                            : isDark
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className='mb-4'>
                  <p className='text-xs font-semibold mb-2 uppercase tracking-wider text-gray-500'>
                    Status
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {statuses.map(s => (
                      <button
                        key={s}
                        onClick={() => toggleStatus(s)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                          selectedStatus === s
                            ? isDark
                              ? 'bg-green-600 text-white'
                              : 'bg-green-500 text-white'
                            : isDark
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(selectedPriority || selectedStatus) && (
                  <button
                    onClick={() => {
                      clearFilters()
                      setIsFilterMenuOpen(false)
                    }}
                    className='w-full text-xs text-center py-2 rounded-lg font-medium text-red-500 hover:bg-red-500 hover:text-white transition-colors'
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
            }`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Profile Menu - Desktop */}
          <div ref={profileMenuRef} className='relative hidden md:block'>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className='flex items-center gap-2 rounded-lg hover:opacity-80 transition-opacity'
              title='User profile'
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                  isDark
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                    : 'bg-gradient-to-br from-blue-400 to-purple-500 text-white'
                }`}
              >
                {userInitial}
              </div>
              <span className='hidden lg:block text-sm font-medium truncate max-w-[120px]'>
                {name}
              </span>
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl text-sm z-20 border overflow-hidden ${
                  isDark
                    ? 'bg-gray-900 text-gray-200 border-gray-700'
                    : 'bg-white text-gray-800 border-gray-200'
                }`}
              >
                <div
                  className={`px-4 py-3 border-b ${
                    isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <p className='font-semibold text-sm'>{name}</p>
                  <p
                    className={`text-xs ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {user?.email || 'User'}
                  </p>
                </div>
                <Link
                  to='/settings'
                  onClick={() => setIsProfileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                    isDark
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <FiSettings size={18} />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3 transition-colors border-t ${
                    isDark
                      ? 'hover:bg-red-900/20 border-gray-700 text-red-400'
                      : 'hover:bg-red-50 border-gray-200 text-red-600'
                  }`}
                >
                  <FiLogOut size={18} />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors'
            aria-label='Toggle mobile menu'
            title='Menu'
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`fixed top-16 left-0 right-0 z-40 border-b transition-all ${
            isDark
              ? 'bg-gray-900 text-gray-200 border-gray-700'
              : 'bg-white text-gray-800 border-gray-200'
          }`}
        >
          {/* Mobile Search */}
          <div className='px-4 py-3 border-b border-gray-700'>
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-md border ${
                isDark
                  ? 'border-gray-700 bg-gray-800'
                  : 'border-gray-300 bg-gray-100'
              }`}
            >
              <FiSearch className='text-gray-500' size={18} />
              <input
                type='search'
                placeholder='Search boards...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={`bg-transparent focus:outline-none text-sm w-full ${
                  isDark
                    ? 'text-[var(--color-text-dark)] placeholder-gray-500'
                    : 'text-[var(--color-text-light)] placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Mobile Filters */}
          <div className='px-4 py-3 border-b border-gray-700'>
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              } ${selectedPriority || selectedStatus ? (isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700') : ''}`}
            >
              <div className='flex items-center gap-2'>
                <FiFilter size={18} />
                <span>Filters</span>
              </div>
              {selectedPriority || selectedStatus ? (
                <span className='text-xs font-bold'>Active</span>
              ) : null}
            </button>

            {isFilterMenuOpen && (
              <div className='mt-3 p-3 rounded-lg bg-gray-800 space-y-3'>
                {/* Priority */}
                <div>
                  <p className='text-xs font-semibold mb-2 uppercase text-gray-400'>
                    Priority
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {priorities.map(p => (
                      <button
                        key={p}
                        onClick={() => togglePriority(p)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                          selectedPriority === p
                            ? 'bg-blue-600 text-white'
                            : isDark
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <p className='text-xs font-semibold mb-2 uppercase text-gray-400'>
                    Status
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {statuses.map(s => (
                      <button
                        key={s}
                        onClick={() => toggleStatus(s)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                          selectedStatus === s
                            ? 'bg-green-600 text-white'
                            : isDark
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {(selectedPriority || selectedStatus) && (
                  <button
                    onClick={() => {
                      clearFilters()
                      setIsFilterMenuOpen(false)
                    }}
                    className='w-full text-xs py-2 rounded font-medium text-red-400 hover:bg-red-900/30'
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Mobile Profile */}
          <div className='px-4 py-3 space-y-2'>
            <Link
              to='/settings'
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <div className='flex items-center gap-3'>
                <FiSettings size={18} />
                <span>Settings</span>
              </div>
            </Link>
            <button
              onClick={() => {
                handleLogout()
                setIsMobileMenuOpen(false)
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                isDark
                  ? 'hover:bg-red-900/20 text-red-400'
                  : 'hover:bg-red-50 text-red-600'
              }`}
            >
              <div className='flex items-center gap-3'>
                <FiLogOut size={18} />
                <span>Log Out</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className='h-16'></div>
    </>
  )
}
