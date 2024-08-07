import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Verify from './pages/Verify';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import SortingExample from './pages/SortingExample';
import './App.css';
import MobilePhone from './pages/CategoriesPage/MobilePhone';
import Detail from './pages/DetailPage/Detail';
import AddProduct from './pages/Seller/AddProduct/AddProduct';
import JoinSeller from './pages/Seller/BecomeSeller/JoinSeller';

const App = () => {
  return  (
    <div>
      <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/tutorial' element={<SortingExample />}/>
          <Route path='/forget-password' element={<ForgotPassword />}/>
          <Route path='/verify/:email' element={<Verify />}/>
          <Route path='/new-password/:email' element={<ChangePassword />}/>
          {/*  for the categories */}
          <Route path='/category/mobilephone' element = {<MobilePhone/>}/>
          {/* for the product detail currently mobile only  */}
          <Route path='/detail/:sku' element = {<Detail/>}/>


          {/*  for the seller routes */}
          <Route path='/seller/join-seller/:userId' element = {<JoinSeller/>}/>
          <Route path='/seller/addproduct/:storeId' element ={<AddProduct/>}/>
        
        </Routes>
      </BrowserRouter>
     
  
        
      </>
    </div>
  )
}

export default App