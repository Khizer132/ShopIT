import React from 'react'
import { useMyOrderQuery } from '../../redux/api/orderApi'

const MyOrders = () => {

    const[myOrders, {}] = useMyOrderQuery();
  return (
    <div>
      
    </div>
  )
}

export default MyOrders
