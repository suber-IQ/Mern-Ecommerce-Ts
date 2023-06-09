// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Elements } from "@stripe/react-stripe-js";
import './App.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './layouts/Navbar/Navbar';
import LoginPage from './pages/User/LoginPage';
import SignupPage from './pages/User/SignupPage';
import HomePage from './pages/User/HomePage';
import ProductDetailsPage from './pages/Product/ProductDetailsPage';
import ProductsPage from './pages/Product/ProductsPage';
import SearchPage from './pages/Product/SearchPage';
import ContactPage from './pages/User/ContactPage';
import AboutPage from './pages/User/AboutPage';
import ProfilePage from './pages/User/ProfilePage';
import ResetPasswordPage from './pages/User/ResetPasswordPage';
import AuthProtectedRoute from './shared/services/AuthProtectedRoute';
import ForgotPasswordPage from './pages/User/ForgotPasswordPage';

const App = () => {
  

   // const [stripeApiKey, setStripeApiKey] = useState("");

   // async function getStripeApiKey() {
   //   const { data } = await axios.get(`${API_ENDPOINT}/api/v1/stripeapikey`);
 
   //   setStripeApiKey(data.stripeApiKey);
   // }

   // useEffect(() => {
   //      getStripeApiKey();
   //    //   store.dispatch(loadUser()) // reload load user me profile after
   // }, []);


   return (
      <BrowserRouter>
         <div className='h-16'>
            <Navbar />
         </div>
        
         <Routes>
        
            {/* Product */}
            <Route path='/' element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:keyword" element={<ProductsPage />} />
            <Route path="/search" element={<SearchPage />} />

            {/* User */}
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path="/account" element={<AuthProtectedRoute>
               <ProfilePage />
            </AuthProtectedRoute>} />
            {/* Authencation */}

            <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />

            <Route path='/password/forgot' element={<ForgotPasswordPage />} />
             <Route path="/password/reset/:token" element={<ResetPasswordPage />} />

         </Routes>
         <ToastContainer />
      </BrowserRouter>
   )
}

export default App




// <>
// {
//    stripeApiKey && (
//       <Elements stripe={loadStripe(stripeApiKey)}>
//          <ProtectedRoute 
//           path='/process/payment'
//           isAuthenticated={isAuthenticated}
//           component={PaymentPage}
//          />
//       </Elements>
//    )
// }
// </>



// <ProtectedRoute
//                path='/account/update/me'
//                isAuthenticated={isAuthenticated}
//                component={UpdateProfilePage}
//             />
//             <ProtectedRoute
//                path='/account/update/password'
//                isAuthenticated={isAuthenticated}
//                component={UpdatePasswordPage}
//             />

//             <Route path='/password/forgot' element={<ForgotPasswordPage />} />
//             <Route path="/password/reset/:token" element={<ResetPasswordPage />} />
//             <Route path='/account/login' element={<LoginPage />} />
//             <Route path='/account/signup' element={<SignupPage />} />

//             {/* Cart */}
//             <Route path='/cart' element={<CartPage />} />
//             {/* Order */}
//             <ProtectedRoute
//                path='/shipping'
//                component={ShippingPage}
//                isAuthenticated={isAuthenticated}
//             />
//             <ProtectedRoute
//                path='/order/success'
//                component={OrderSuccessPage}
//                isAuthenticated={isAuthenticated}
//             />
//             <ProtectedRoute
//                path="/orders/me"
//                component={MyOrderPage}
//                isAuthenticated={isAuthenticated}

//             />
//             <ProtectedRoute
//                path='/order/confirm'
//                component={ConfirmOrderPage}
//                isAuthenticated={isAuthenticated}
//             />

//             {/* Admin route */}
//             <ProtectedRoute
//                path='/admin/dashboard'
//                isAdminRoute={isAdmin}
//                isAuthenticated={isAuthenticated}
//                component={DashboardPage}
//             />

//             <ProtectedRoute
//                path='/admin/products'
//                isAdminRoute={isAdmin}
//                isAuthenticated={isAuthenticated}
//                component={ProductListPage} 
//                />
//             <ProtectedRoute
//                path='/admin/new/product'
//                isAdminRoute={isAdmin}
//                isAuthenticated={isAuthenticated}
//                component={NewProductPage} 
//                />
//             <ProtectedRoute
//                path='/admin/update/product/:id'
//                isAdminRoute={isAdmin}
//                isAuthenticated={isAuthenticated}
//                component={UpdateProductPage} 
//                />
//             <ProtectedRoute
//                path='/admin/orders'
//                isAdminRoute={isAdmin}
//                isAuthenticated={isAuthenticated}
//                component={OrderListPage} 
//                />

//                <ProtectedRoute
//                path='/admin/order/:id'
//                isAdminRoute={isAdmin}
//                isAuthenticated={isAuthenticated}
//                component={ProcessOrderPage}
//                />
//              {/* Admin Users */}
//                <ProtectedRoute
//                path='/admin/users'
//                isAdminRoute={isAdmin}
//                isAuthenticated={isAuthenticated}
//                component={UsersListPage}
//                />
//                <ProtectedRoute
//                path='/admin/user/:id'
//                isAdminRoute={isAdmin}
//                isAuthenticated={isAuthenticated}
//                component={UpdateUserPage}
//                />
//                <ProtectedRoute
//                path='/admin/reviews'
//                isAdminRoute={isAdmin}
//                isAuthenticated={isAuthenticated}
//                component={ProductReviewsPage}
//                />
               
//                <Route 
//                 element={
//                   window.location.pathname === '/process/payment' ? null : <NotFoundLayout />
//                 }
//                />
//                <Route
//                path="*"
//                element={<NotFoundLayout />}
//                 />