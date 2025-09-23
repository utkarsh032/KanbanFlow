import { FiCheckCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export const KanbanFlow = () => {
  return (
    <Link to='/' className='flex items-center gap-2  font-bold'>
      <FiCheckCircle className='bg-[#333] rounded-xl p-1 text-3xl' />
      <p className='text-2xl'>KanbanFlow</p>
    </Link>
  )
}
