import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom'
import Login from "./components/login"
import Register from "./components/register"
import Profile from './components/profile';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { auth } from './components/firebase';
import { Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    })
  })
  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            <Route path='/'
              element={user ? <Navigate to="profile" /> : <Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default App
