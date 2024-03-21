import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import './style/style.scss'
import Nav from './components/Nav';
import Products from './pages/Products';
import AddProducts from './pages/AddProducts';

const App = () => {
  return (
    <div className='app'>
      <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/products' element={<AddProducts />} />
      </Routes>
      </Router>
    </div>
  )
}

export default App