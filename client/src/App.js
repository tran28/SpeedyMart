import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import axios from 'axios'
import Home from './components/home'
import Checkout from './components/checkout'
import Shop from './components/shop'
import Header from './components/global/Header'
import Register from './components/account/Register'
import Account from './components/account'
import Login from './components/account/Login'
import PrivateRoute from './PrivateRoute'
// const baseUrl = '/api/products'

const App = () => {
  // const [products, setProducts] = useState([])

  // useEffect(() => {
  //   axios
  //     .get(baseUrl)
  //     .then(response => {
  //       console.log(response.data)
  //       setProducts(response.data)
  //     })
  // }, [])

  return (
    <Router>
      {/* M: Global header component on every page*/}
      <Header />

      <Routes>
        {/* M: Every page must have a route with an exact path and an element (component)*/}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route exact path="/account/login" element={<Login />} />
        <Route exact path="/account/register" element={<Register />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/checkout" element={<Checkout />} />

      </Routes>

    </Router>
  )
}

export default App;