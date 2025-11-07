import React, { useEffect } from 'react';
import { useGetAdminOrdersQuery, useDeleteOrderMutation } from '../../redux/api/orderApi';
import toast from 'react-hot-toast';
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import AdminLayout from '../layouts/adminLayout';

const ListOrders = () => {
    const { isLoading, error, data } = useGetAdminOrdersQuery();

    const [deleteOrder, { error: deleteError, isLoading: isDeleteLoading, isSuccess }] = useDeleteOrderMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
        if (deleteError) {
            toast.error(deleteError?.data?.message);
        }
        if (isSuccess) {
            toast.success("Order deleted");
        }
    }, [error, deleteError, isSuccess]);

    const deleteOrderHandler = (id) => {
        deleteOrder({ id });
    };

    console.log("Admin Orders Data:", data); // Debugging

    const setOrders = (orders) => {
        console.log("Orders passed to setOrders:", orders); // Debugging

        const tableData = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Payment Status',
                    field: 'paymentStatus',
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

        orders?.forEach((order) => {
            tableData.rows.push({
                id: order._id,
                paymentStatus: order?.paymentInfo?.status?.toUpperCase(),
                orderStatus: order?.orderStatus,
                actions: (
                    <>
                        <Link to={`/admin/orders/${order._id}`} className="btn btn-outline-primary">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button
                            className="btn btn-danger mx-2"
                            onClick={() => deleteOrderHandler(order?._id)}
                            disabled={isDeleteLoading}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });

        console.log("Table Data:", tableData); // Debugging

        return tableData;
    };

    if (isLoading) return <Loader />;
    if (error) return <p>Error loading orders</p>;

    return (
        <AdminLayout>
            {data?.order?.length > 0 ? (
                <>
                    <h3 className="mt-5">{data.order.length} Orders</h3>
                    <MDBDataTable
                        data={setOrders(data.order)}
                        className="px-3"
                        striped
                        hover
                    />
                </>
            ) : (
                <p>No orders found</p>
            )}
        </AdminLayout>
    );
};

export default ListOrders;