import React from 'react'
import { Route } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import Dashboard from '../admin/Dashboard';
import ListProducts from '../admin/listProducts';
import NewProduct from '../admin/newProduct';
import UpdateProduct from '../admin/updateProduct';
import ListOrders from '../admin/listOrders';
import ProcessOrders from '../admin/processOrders';
import ListUsers from '../admin/listUsers';
import ProcessUsers from '../admin/processUsers';



const adminRoutes = () => {
  return (
    <>

      <Route path="/admin/dashboard" element={<ProtectedRoute admin={true}>
        <Dashboard />
      </ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute admin={true}>
        <ListProducts />
      </ProtectedRoute>} />
      <Route path="/admin/product/new" element={<ProtectedRoute admin={true}>
        <NewProduct />
      </ProtectedRoute>} />
      <Route path="/admin/products/:id" element={<ProtectedRoute admin={true}>
        <UpdateProduct />
      </ProtectedRoute>} />
      <Route path="/admin/orders" element={<ProtectedRoute admin={true}>
        <ListOrders />
      </ProtectedRoute>} />
      <Route path="/admin/orders/:id" element={<ProtectedRoute admin={true}>
        <ProcessOrders />
      </ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute admin={true}>
        <ListUsers />
      </ProtectedRoute>} />
      <Route path="/admin/users/:id" element={<ProtectedRoute admin={true}>
        <ProcessUsers />
      </ProtectedRoute>} />

    </>
  )
}

export default adminRoutes
