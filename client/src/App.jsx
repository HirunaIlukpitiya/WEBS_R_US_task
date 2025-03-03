import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Summary from './pages/summary'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/summary" element={<Summary />} />
    </Routes>
    </>
  )
}

export default App
