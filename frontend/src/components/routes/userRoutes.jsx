import React from 'react'
import { Route } from 'react-router-dom';

import Home from '../Home';
import ProductDetails from '../product/productDetails';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Profile from '../user/Profile';
import UpdateProfile from '../user/updateProfile';
import UpdatePassword from '../user/updatePassword';
import ProtectedRoute from '../auth/ProtectedRoute';
import ForgotPassword from '../auth/forgotPassword';
import ResetPassword from '../auth/resetPassword';
import Cart from '../cart/Cart';
import Shipping from '../cart/Shipping';
import ConfirmOrder from '../cart/confirmOrder';
import PaymentMethod from '../cart/paymentMethod';
import MyOrders from '../order/myOrders';
import OrderDetails from '../order/orderDetails';
import Invoice from '../invoice/Invoice';


const userRoutes = () => {
  return (
    <>
      <Route path='/' element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/password/reset/:token" element={<ResetPassword />} />

      <Route path="/me/Profile" element={<ProtectedRoute>
        <Profile />
      </ProtectedRoute>} />
      <Route path="/me/update_profile" element={<ProtectedRoute>
        <UpdateProfile />
      </ProtectedRoute>} />
      <Route path="/me/update_password" element={<ProtectedRoute>
        <UpdatePassword />
      </ProtectedRoute>} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/shipping" element={<ProtectedRoute>
        <Shipping />
      </ProtectedRoute>} />
      <Route path="/confirm_order" element={<ProtectedRoute>
        <ConfirmOrder />
      </ProtectedRoute>} />
      <Route path="/payment_method" element={<ProtectedRoute>
        <PaymentMethod />
      </ProtectedRoute>} />
      <Route path="/me/orders" element={<ProtectedRoute>
        <MyOrders />
      </ProtectedRoute>} />
      <Route path="/me/orders/:id" element={<ProtectedRoute>
        <OrderDetails />
      </ProtectedRoute>} />

      <Route path="/invoice/orders/:id" element={<ProtectedRoute>
        <Invoice />
      </ProtectedRoute>} />
    </>
  )
}

export default userRoutes
