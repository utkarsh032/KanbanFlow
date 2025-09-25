import React from 'react'
import { BoardCard } from '../../compoenent/BoardCard'

export const BoardLists = ({ boards, onEdit, onDuplicate, onDelete }) => {
  return (
    <div className='grid grid-cols-4 md:grid-cols-2 gap-4'>
      {boards.length === 0 ? (
        <p>No boards created yet.</p>
      ) : (
        boards.map((board, index) => (
          <BoardCard
            key={index}
            index={index}
            {...board}
            onEdit={() => onEdit(index)}
            onDuplicate={() => onDuplicate(index)}
            onDelete={() => onDelete(index)}
          />
        ))
      )}
    </div>
  )
}
