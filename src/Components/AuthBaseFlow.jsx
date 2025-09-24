import { SlEnergy } from 'react-icons/sl'
import { AiOutlineTeam } from 'react-icons/ai'
import { SiGoogleanalytics } from 'react-icons/si'

import { KanbanFlow } from './Logo/KanbanFlow'

const flowData = [
  {
    icon: <SlEnergy size={28} />,
    title: 'Intuitive Kanban Boards',
    details: 'Visualize your workflow with drag-and-drop simplicity'
  },
  {
    icon: <AiOutlineTeam size={28} />,
    title: 'Team Collaboration',
    details: 'Work together seamlessly with real-time updates'
  },
  {
    icon: <SiGoogleanalytics size={28} />,
    title: 'Boost Productivity',
    details: 'Stay organized with priorities, due dates, and subtasks'
  }
]

export const AuthBaseFlow = () => {
  return (
    <div className='flex flex-col justify-between h-screen px-8 py-6 bg-[#0f0f0f] text-gray-200'>
      <div>
        {/* Logo */}
        <KanbanFlow />

        {/* Features */}
        <div className='mt-10 space-y-6'>
          {flowData.map((flow, index) => (
            <div
              key={index}
              className='flex items-start gap-4 border-b border-gray-800 pb-4'
            >
              <span className='text-[#fff]'>{flow.icon}</span>
              <div>
                <h3 className='text-lg font-semibold'>{flow.title}</h3>
                <p className='text-sm text-gray-400'>{flow.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className='text-center text-gray-500 text-sm border-t border-gray-800 pt-4'>
        <p>
          Join thousands of teams already using{' '}
          <span className='text-white font-medium'>KanbanFlow</span> to manage
          their projects
        </p>
      </div>
    </div>
  )
}
