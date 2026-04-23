
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage/HomePage'
import Authentication from './Components/Authentications/Authentication'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<Authentication />} />
    </Routes>
  )
}

export default App