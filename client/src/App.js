import { useState, useEffect } from 'react'
import axios from 'axios'
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
    <div>
      <h1>Welcome to SpeedyMart</h1>
      <h2>Look at all these products we are selling:</h2>

      <pre>{JSON.stringify(products,null,2)}</pre>

    </div>
  )
}

export default App;
