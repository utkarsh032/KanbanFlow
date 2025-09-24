import { FiArrowRight } from 'react-icons/fi'

import { KanbanFlow } from '../Components/Logo/KanbanFlow'
import { Link } from 'react-router-dom'
import { CardSection } from '../Components/Card/CardSection'

export default function StarterPage () {
  return (
    <div className='min-h-screen px-6 md:px-12 lg:px-24 py-8 flex flex-col'>
      {/* HEADER */}
      <header className='flex justify-between items-center'>
        <KanbanFlow />
        <div className='flex justify-center items-center gap-4'>
          <Link to='/sign-in' className='btn1 '>
            Sign in
          </Link>
          <Link to='/sign-up' className='btn2'>
            Get Started
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className='flex flex-col justify-center items-center text-center mt-20'>
        <div className=''>
          <div>
            <h1 className='heading'>Organize.</h1>
            <h1 className='sub-heading'>Prioritize.</h1>
            <h1 className='heading'>Succeed.</h1>

            <p className=' mt-6 text-xl max-w-xl mx-auto'>
              Transform your workflow with intuitive kanban boards. Streamline
              projects, boost productivity, and achieve your goals with
              KanbanFlow.
            </p>
          </div>

          <div className='flex justify-center items-center gap-6 mt-8'>
            <Link to='/sign-up' className='btn1 flex items-center gap-2'>
              Start Free Today <FiArrowRight />
            </Link>
            <Link to='/sign-up' className='btn2'>
              View Demo
            </Link>
          </div>

          {/*CardSection  */}
          <CardSection />
        </div>
      </main>

      <footer className='mt-32 text-center text-gray-500 border-t pt-6'>
        <p>© 2024 KanbanFlow. Built with React, TailwindCSS, and passion.</p>
      </footer>
    </div>
  )
}
