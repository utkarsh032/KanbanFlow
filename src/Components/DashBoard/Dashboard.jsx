import { Routes, Route } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import { Board } from '../Board/Board'
import BoardById from '../Board/ID/BoardById'
import { useTheme } from '../../context/ThemeContext'
import BoardSettings from '../Settings/BoardSettings'

export const Dashboard = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className='h-screen flex flex-col'>
      {/* Fixed Navbar */}
      <Navbar />

      {/* Scrollable Content */}
      <div
        className={`flex-1 overflow-y-auto pt-16 ${
          isDark
            ? 'bg-[var(--color-bg-dark)] text-[var(--color-text-dark)]'
            : 'bg-[var(--color-bg-light)] text-[var(--color-text-light)]'
        }`}
      >
        <Routes>
          <Route index element={<Board />} />
          <Route path='BoardById/:id' element={<BoardById />} />
        </Routes>
      </div>
    </div>
  )
}
