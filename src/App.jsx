import { Route, Routes } from 'react-router-dom'
import './App.css'
import StarterPage from './Starter/StarterPage'
import AuthUI from './UI/AuthUI'
import { SignIn } from './Components/AuthPage.jsx/SignIn'
import SignUp from './Components/AuthPage.jsx/SignUp'
import ProtectedRoute from './Components/ProtectRoute/ProtectedRoute'
import { Dashboard } from './Components/Dashboard'

function App () {
  return (
    <Routes>
      {/* Starter / Landing Page */}
      <Route path='/' element={<StarterPage />} />

      {/* Auth Page */}
      <Route path='/' element={<AuthUI />}>
        <Route path='sign-in' element={<SignIn />} />
        <Route path='sign-up' element={<SignUp />} />
      </Route>

      {/* Protected Pages */}
      <Route
        path='/project'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
