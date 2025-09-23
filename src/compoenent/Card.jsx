import React from 'react'

export default function Card ({ icon, title, details }) {
  return (
    <div className='card'>
      <div className='card-icon '>{icon}</div>
      <h3 className='card-title'>{title}</h3>
      <p className='card-details'>{details}</p>
    </div>
  )
}
