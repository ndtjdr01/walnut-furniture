import './App.css'
import Header from './component/header/header'
import Slide from './component/slider/slide'
import { Route, Routes } from 'react-router-dom'
import Order from './pages/order/order'
import Add from './pages/add/add'
import List from './pages/list/list'

function App() {

  return (
    <div>
      <Header />
      <div className="app">
        <Slide/>
        <Routes>
          <Route path='/order' element={<Order/>}></Route>
          <Route path='/add' element={<Add/>}></Route>
          <Route path='/list' element={<List/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
