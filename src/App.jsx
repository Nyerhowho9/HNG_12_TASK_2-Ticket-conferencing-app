import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Events from './pages/Events'
import Tickets from './pages/Tickets'
import Projects from './pages/Project'
import Details from './pages/Details'
import ReadyTicket from './pages/ReadyTicket'


function App() {

  return (
    <div>
    
    <Routes>
      <Route path='/' element={<Events/>} />
      
      <Route path='/tickets' element={<Tickets/>} />
      <Route path='/project' element={<Projects/>} />
      <Route path='/details' element={<Details/>} />
      <Route path='/ready' element={<ReadyTicket/>}/>
    </Routes>
  </div>
  )
}

export default App
