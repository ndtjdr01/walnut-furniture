// import { useState } from 'react'
import Header from './component/header/header'
import Footer from './component/footer/footer'
import { Route, Routes } from 'react-router-dom'
import Product from './pages/product/product'
import { useState } from 'react'
import Login from './component/loginorsignup/login'
import Signup from './component/loginorsignup/signup'
import Cart from './pages/cart/cart'
import More from './pages/more/more'
import About from './pages/about/about'
import ProductItem from './pages/productItem/productItem'
import FormContact from './component/form-address/formContact'
import './App.css'
import Verify from './pages/verify/verify'

function App() {
  const [formDisplay, setFormDisplay] = useState(false)
  const [isLogin,setIsLogin] = useState(false)
  const [isTypeLogin,setIsTypeLogin] = useState(true)

  return (
    <>
      {isLogin
      ?isTypeLogin?<Login setIsLogin ={setIsLogin} setIsTypeLogin={setIsTypeLogin} />
      :<Signup setIsLogin ={setIsLogin} setIsTypeLogin={setIsTypeLogin} />
      :null}
      {formDisplay ?
        <div className="product-item-form-container">
          <FormContact />
          <span onClick={()=>setFormDisplay(false)}>x</span>
        </div> : null}
      <Header setIsLogin ={setIsLogin} setFormDisplay={setFormDisplay} />
      <div className="app">
        <Routes>
          <Route path='/' element={<Product/>} ></Route>
          <Route path='/cart' element={<Cart setFormDisplay={setFormDisplay}/>} ></Route>
          <Route path='/about' element={<About/>} ></Route>
          <Route path='/more' element={<More/>} ></Route>
          <Route path='/product' element={<Product/>} ></Route>
          <Route path='/verify' element={<Verify/>} ></Route>
          <Route path='/product-item/:id' element={<ProductItem setFormDisplay={setFormDisplay}/>} ></Route>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
