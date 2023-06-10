import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import { ToastContainer} from 'react-toastify';
import Navbar from './layouts/Navbar/Navbar';
import Home from './pages/User/HomePage';
import LoginPage from './pages/User/LoginPage';
import SignupPage from './pages/User/SignupPage';
import CartPage from './pages/User/CartPage';
import ProductListPage from './pages/User/ProductListPage';
import ProductListItemPage from './pages/User/ProductListItemPage';

const App = () => {
  return (
   <BrowserRouter>
      <div className='h-16'>
      <Navbar />
      </div>
      <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/account/signup' element={<SignupPage />} />
         <Route path='/account/login' element={<LoginPage />} />
         <Route path='/cart' element={<CartPage />} />
         {/* Product */}
         <Route path='/products' element={<ProductListPage />} />
         <Route path='/product/1' element={<ProductListItemPage />} />
      </Routes>
      <ToastContainer />
   </BrowserRouter>
  )
}

export default App