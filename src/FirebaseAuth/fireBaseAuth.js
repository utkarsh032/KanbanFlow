import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDOGJen4RV4Elmf3Sxs665eo4KuDBkfC2c',
  authDomain: 'kanbanflow-63902.firebaseapp.com',
  projectId: 'kanbanflow-63902',
  storageBucket: 'kanbanflow-63902.firebasestorage.app',
  messagingSenderId: '364478175581',
  appId: '1:364478175581:web:3e5a84128687aa7d9830b4',
  measurementId: 'G-43NSDQ21VZ'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export Auth instance
export const auth = getAuth(app)
