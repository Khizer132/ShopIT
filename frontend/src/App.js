import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/productDetails';
import { Toaster } from 'react-hot-toast';
import Login from './auth/Login';
import Register from './auth/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/updateProfile';
import UpdatePassword from './components/user/updatePassword';
import ProtectedRoute from './auth/ProtectedRoute';
import ForgotPassword from './auth/forgotPassword';
import ResetPassword from './auth/resetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/confirmOrder';
import PaymentMethod from './components/cart/paymentMethod';


function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />

        <div className="container">
          <Routes>
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

          </Routes>

        </div>

        <Footer />

      </div>
    </Router>
  );
}

export default App;
