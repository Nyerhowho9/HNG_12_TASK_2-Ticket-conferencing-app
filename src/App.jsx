import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Events from './pages/Events'
import Tickets from './pages/Tickets'
import Projects from './pages/Project'


function App() {

  return (
    <div>
    
    <Routes>
      <Route path='/' element={<Events/>} />
      
      <Route path='/tickets' element={<Tickets/>} />
      <Route path='/project' element={<Projects/>} />
    </Routes>
  </div>
  )
}

export default App
