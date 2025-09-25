import { FiCheckCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

export const KanbanFlowLogo = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Link
      to='/'
      className={`flex items-center gap-2 font-bold ${
        isDark
          ? 'bg-[var(--color-bg-dark)] text-[var(--color-text-dark)]'
          : 'bg-[var(--color-bg-light)] text-[var(--color-text-light)]'
      }`}
    >
      <FiCheckCircle
        className={` rounded-xl p-1 text-3xl  ${
          isDark
            ? 'bg-[var(--color-bg-dark)] text-[var(--color-text-dark)]'
            : 'bg-[var(--color-bg-light)] text-[var(--color-text-light)]'
        }`}
      />
      <p className='text-2xl'>KanbanFlow</p>
    </Link>
  )
}
