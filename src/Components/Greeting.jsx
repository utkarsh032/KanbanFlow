import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export const Greeting = ({
  title = 'Welcome back',
  subtitle = 'Manage your projects, track tasks, and stay productive with your Kanban boards.'
}) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const { user } = useAuth()
  const name =
    user?.displayName || (user?.email ? user.email.split('@')[0] : 'Guest')

  return (
    <div
      className={`p-8 border-b shadow-2xl border-gray-900 ${
        isDark
          ? 'bg-[var(--color-bg-dark)] text-[var(--color-text-dark)]'
          : 'bg-[var(--color-bg-light)] text-[var(--color-text-light)]'
      }`}
    >
      <h1
        className={`text-3xl font-semibold ${
          isDark ? 'text-gray-100' : 'text-gray-900'
        }`}
      >
        {title}, <span className='text-indigo-400'>{name}</span>!
      </h1>

      {subtitle && (
        <p
          className={`mt-2 leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
