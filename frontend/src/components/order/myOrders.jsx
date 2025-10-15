import React from 'react'
import { useMyOrdersQuery } from '../../redux/api/orderApi'
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCartItems } from '../../redux/slice/cartSlice';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {

  const { isLoading, error, data } = useMyOrdersQuery();
  const [searchParams] = useSearchParams();

  const orderSuccess = searchParams.get("order_success");
  const dispatch = useDispatch();
  const navigate = useNavigate();

// Clear cart items if order is successful
  useEffect(() => {

    if (error) {
      toast.error(error?.data?.message);
    }
    if (orderSuccess) {
      dispatch(clearCartItems());
      navigate("/me/orders");
      toast.success("Order placed successfully");
    }

  }, [error, orderSuccess]);

  // Prepare data for MDBDataTable
  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'Order ID',
          field: 'id',
          sort: 'asc'
        },

        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc'
        },
        {
          label: 'Payment Status',
          field: 'status',
          sort: 'asc'
        },
        {
          label: 'Order Status',
          field: 'orderStatus',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc'
        },
      ],
      rows: []
    };
    
// Populate rows with order data
    data?.orders?.forEach((order) => {
      order.rows.push({
        id: order._id,
        amount: `$${order.totalPrice}`,
        status: order.paymentInfo.status,
        orderStatus: order.orderStatus,
        actions: (
          <>
            <Link to={`me/orders/${order._id}`} className="btn btn-primary">
              <i className="fa fa-eye"></i>
            </Link>
            <Link to={`invoice/order/${order._id}`} className="btn btn-success mx-2">
              <i className="fa fa-print"></i>
            </Link>
          </>
        )

      })}
    );

    return data;
  };




  if (isLoading) return <Loader />;



  return (
    <>
      <div>
        {data?.orders ? (
          <h3 className="mt-5">{data.orders.length}</h3>
        ) : (
          <p>No orders found</p>
        )}

        <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
        />


      </div>

    </>

  )
}

export default MyOrders
