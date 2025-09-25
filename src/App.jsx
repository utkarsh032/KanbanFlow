import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import StarterPage from './Starter/StarterPage'
import AuthUI from './UI/AuthUI'
import { SignIn } from './Components/AuthPage.jsx/SignIn'
import SignUp from './Components/AuthPage.jsx/SignUp'
import { useAuth } from './context/AuthContext'
import { Dashboard } from './Components/DashBoard/Dashboard'

function App () {
  const { user } = useAuth()

  return (
    <Routes>
      {user ? (
        <>
          {/* Protected Routes */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<Navigate to='/dashboard' replace />} />
        </>
      ) : (
        <>
          {/* Public Routes */}
          <Route path='/' element={<StarterPage />} />
          <Route path='/' element={<AuthUI />}>
            <Route path='sign-in' element={<SignIn />} />
            <Route path='sign-up' element={<SignUp />} />
          </Route>

          {/* Catch-all */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </>
      )}
    </Routes>
  )
}

export default App
