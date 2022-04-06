import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Home from './components/home'
const baseUrl = '/api/products'

const App = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        console.log(response.data)
        setProducts(response.data)
      })
  }, [])

  return (
    <Router>
      <Routes>
        {/* M: Every page must have a route with an exact path and an element (component)*/}
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;