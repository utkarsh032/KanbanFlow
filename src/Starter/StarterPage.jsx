import { FiArrowRight } from 'react-icons/fi'
import { KanbanFlowLogo } from '../Components/Logo/KanbanFlowLogo'
import { Link } from 'react-router-dom'
import { CardSection } from '../Components/Card/CardSection'

export default function StarterPage () {
  return (
    <div className='min-h-screen bg-[#111] flex flex-col'>
      <div className='px-6 md:px-12 lg:px-24 py-8 '>
        {/* HEADER */}
        <header className='flex justify-between items-center'>
          <KanbanFlowLogo />
          <nav className='flex items-center gap-4'>
            <Link to='/sign-in' className='btn1'>
              Sign in
            </Link>
            <Link to='/sign-up' className='btn2'>
              Get Started
            </Link>
          </nav>
        </header>

        {/* HERO SECTION */}
        <main className='flex flex-col justify-center items-center text-center mt-20 flex-grow'>
          <section>
            <h1 className='heading'>Organize.</h1>
            <h2 className='sub-heading'>Prioritize.</h2>
            <h1 className='heading'>Succeed.</h1>

            <p className='mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-400'>
              Transform your workflow with intuitive kanban boards. Streamline
              projects, boost productivity, and achieve your goals with
              <span className='font-semibold'> KanbanFlow</span>.
            </p>

            <div className='flex justify-center items-center gap-6 mt-8 flex-wrap'>
              <Link to='/sign-up' className='btn1 flex items-center gap-2'>
                Start Free Today <FiArrowRight />
              </Link>
              <Link to='/demo' className='btn2'>
                View Demo
              </Link>
            </div>
          </section>

          {/* FEATURES SECTION */}
          <section className='mt-20 w-full'>
            <CardSection />
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <footer className=' mt-20 text-center text-gray-500 border-t p-6 text-sm'>
        <p>
          © {new Date().getFullYear()} KanbanFlow. Built with React,
          TailwindCSS, and passion.
        </p>
      </footer>
    </div>
  )
}
