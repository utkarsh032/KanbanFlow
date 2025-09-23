import { SlEnergy } from 'react-icons/sl'
import { AiOutlineTeam } from 'react-icons/ai'
import { SiGoogleanalytics } from 'react-icons/si'

import Card from '../../compoenent/Card'

const cardData = [
  {
    icon: <SlEnergy />,
    title: 'Lightning Fast',
    details:
      'Intuitive drag-and-drop interface that makes project management effortless.'
  },
  {
    icon: <AiOutlineTeam />,
    title: 'Team Collaboration',
    details:
      'Work together seamlessly with real-time updates and shared boards.'
  },
  {
    icon: <SiGoogleanalytics />,
    title: 'Track Progress',
    details: 'Visual progress tracking with priority levels and due dates.'
  }
]

export const CardSection = () => {
  return (
    <div className='flex flex-wrap gap-8 mt-16 justify-center '>
      {cardData.map((card, index) => (
        <Card
          key={index}
          icon={card.icon}
          title={card.title}
          details={card.details}
        />
      ))}
    </div>
  )
}
