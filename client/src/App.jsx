import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import StripeCheckout from 'react-stripe-checkout'

function App() {
  const [product, setProduct] = useState({
    name:'GTA V',
    price:10,
    productBy:"Rockstar games"
  })
const makePayment=token=>{
  const body  = {
    token,
    product
  }
  const headers={
    "Content-Type": "application/json"
  }

  return fetch(`http://localhost:8000/payment`,{
    method:"POST",
    headers,
    body:JSON.stringify(body)
  }).then(response=>{
    console.log({response});
    const {status} = response
    console.log({status});
    
  })
  .catch(err=>console.log(err)
  )
}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
          <a
            className="App-link"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
<div>

          <StripeCheckout 
        stripeKey={import.meta.env.VITE_KEY}
        token={makePayment}
        name="Buy GTA V"
        >
          <button className="btn-large pink">Buy GTA V ${product.price}</button>
          </StripeCheckout>
          </div>
      
      </header>
    </div>
  )
}

export default App
