import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Home from './components/home'
import Account from './components/account'
import Checkout from './components/checkout'
import Shop from './components/shop'
import Header from './components/global/Header'
import Footer from './components/global/Footer'
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
      {/* M: Global header component on every page*/}
      <Header />

      <Routes>
        {/* M: Every page must have a route with an exact path and an element (component)*/}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/checkout" element={<Checkout />} />

      </Routes>

      {/* M: Global footer component on every page*/}
      <Footer />

    </Router>
  )
}

export default App;