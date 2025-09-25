import { Routes, Route } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import { Board } from '../Board/Board'
import BoardById from '../Board/ID/BoardById'

export const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<Board />} />
        <Route path='BoardById/:id' element={<BoardById />} />
      </Routes>
    </div>
  )
}
