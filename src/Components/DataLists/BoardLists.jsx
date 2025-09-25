import React from 'react'
import { BoardCard } from '../../compoenent/BoardCard'

export const BoardLists = ({ boards, onEdit, onDuplicate, onDelete }) => {
  return (
    <div className='grid grid-cols-4 md:grid-cols-2 gap-4 mt-4'>
      {boards.length === 0 ? (
        <p>No boards created yet.</p>
      ) : (
        boards.map(board => (
          <BoardCard
            key={board.id}
            {...board}
            onEdit={() => onEdit(board.id)}
            onDuplicate={() => onDuplicate(board.id)}
            onDelete={() => onDelete(board.id)}
          />
        ))
      )}
    </div>
  )
}
