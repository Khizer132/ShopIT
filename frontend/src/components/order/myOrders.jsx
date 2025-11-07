import React, { useEffect } from 'react';
import { useMyOrdersQuery } from '../../redux/api/orderApi';
import toast from 'react-hot-toast';
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCartItems } from '../../redux/slice/cartSlice';

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
    }, [error, orderSuccess, dispatch, navigate]);

    // Prepare data for MDBDataTable
    const setOrders = () => {
        console.log("My Orders Data:", data);
        console.log("Orders Array:", data?.order); // Debugging

        const tableData = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc',
                },
                {
                    label: 'Payment Status',
                    field: 'status',
                    sort: 'asc',
                },
                {
                    label: 'Order Status',
                    field: 'orderStatus',
                    sort: 'asc',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc',
                },
            ],
            rows: [],
        };

        data?.order?.forEach((order) => {
            tableData.rows.push({
                id: order._id,
                amount: `$${order.totalPrice}`,
                status: order.paymentInfo?.status || "N/A",
                orderStatus: order.orderStatus,
                actions: (
                    <>
                        <Link to={`me/orders/${order._id}`} className="btn btn-primary">
                            <i className="fa fa-eye"></i>
                        </Link>
                        <Link to={`/invoice/orders/${order._id}`} className="btn btn-success mx-2">
                            <i className="fa fa-print"></i> Generate Invoice
                        </Link>
                    </>
                ),
            });
        });

        console.log("Table Data:", tableData); // Debugging

        return tableData;
    };

    if (isLoading) return <Loader />;

    return (
        <>
            <div>
                {data?.order?.length > 0 ? (
                    <h3 className="mt-5">{data.order.length} Orders</h3>
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
    );
};

export default MyOrders;