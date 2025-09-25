import { Board } from '../Board/Board'
import { Greeting } from '../Greeting'
import { Navbar } from '../Navbar/Navbar'

export const Dashboard = () => {
  return (
    <div>
      <Navbar />

      {/* <Greeting /> */}
      <Board />
    </div>
  )
}
