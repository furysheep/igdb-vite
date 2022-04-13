import './App.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Route, Routes } from 'react-router-dom'

import Header from 'layouts/Header'
import Home from 'pages/Home'
import Details from 'pages/Details'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="games">
          <Route path=":gameId" element={<Details />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
