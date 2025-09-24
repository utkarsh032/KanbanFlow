import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { auth } from '../FirebaseAuth/fireBaseAuth'

// Email Signup
export const signup = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

// Email Login
export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

// Google Login
export const googleLogin = () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

// Logout
export const logout = () => signOut(auth)
