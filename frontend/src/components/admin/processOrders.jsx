import React, { useState, useEffect } from 'react';
import { useOrderDetailsQuery, useUpdateOrderMutation } from '../../redux/api/orderApi';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';

const ProcessOrders = () => {
    const [status, setStatus] = useState("");

    const params = useParams();
    const { data, refetch } = useOrderDetailsQuery(params.id);
    const order = data?.order;

    const [updateOrder, { error, isSuccess, reset }] = useUpdateOrderMutation();

    const { shippingInfo, orderItems, paymentInfo, user, totalAmount, orderStatus } = order || {};

    const isPaid = paymentInfo?.status === "paid" ? true : false;

    useEffect(() => {
        if (orderStatus) {
            setStatus(orderStatus);
        }
    }, [orderStatus]);

    useEffect(() => {
        if (error) {
            console.error("Update Order Error:", error); // Debugging
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            console.log("Order Updated Successfully"); // Debugging
            refetch(); // Refetch the updated order details
            reset(); // Reset the mutation state
        }
    }, [error, isSuccess, refetch, reset]);

    const handleOrderStatus = async (id) => {
        try {
            const data = { status };
            const response = await updateOrder({ id, body: data });

            console.log("Update Order Response:", response); // Debugging

            if (response?.data?.success) {
                setStatus(response.data.order.orderStatus); 
            }
        } catch (error) {
            console.error("Error updating order:", error); // Debugging
            toast.error("Failed to update order status");
        }
    };

    return (
        <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-8 order-details">
                <h3 className="mt-5 mb-4">Order Details</h3>

                <table className="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <th scope="row">ID</th>
                            <td>{order?._id}</td>
                        </tr>
                        <tr>
                            <th scope="row">Status</th>
                            <td className={String(orderStatus).includes("Delivered") ? "greenColor" : "redColor"}>
                                <b>{orderStatus}</b>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h3 className="mt-5 mb-4">Shipping Info</h3>
                <table className="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <th scope="row">Name</th>
                            <td>{user?.name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Phone No</th>
                            <td>{shippingInfo?.phoneNo}</td>
                        </tr>
                        <tr>
                            <th scope="row">Address</th>
                            <td>{shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.postalCode}, {shippingInfo?.country}</td>
                        </tr>
                    </tbody>
                </table>

                <h3 className="mt-5 mb-4">Payment Info</h3>
                <table className="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <th scope="row">Status</th>
                            <td className={isPaid ? "greenColor" : "redColor"}>
                                <b>{paymentInfo?.status}</b>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Method</th>
                            <td>{order?.paymentMethod}</td>
                        </tr>
                        <tr>
                            <th scope="row">Stripe ID</th>
                            <td>{paymentInfo?.id || "NILL"}</td>
                        </tr>
                        <tr>
                            <th scope="row">Amount Paid</th>
                            <td>{totalAmount}</td>
                        </tr>
                    </tbody>
                </table>

                <h3 className="mt-5 my-4">Order Items:</h3>
                <hr />
                <div className="cart-item my-1">
                    {orderItems?.map((item) => (
                        <div className="row my-5" key={item?.product}>
                            <div className="col-4 col-lg-2">
                                <img
                                    src={item?.image}
                                    alt={item?.name}
                                    height="45"
                                    width="65"
                                />
                            </div>

                            <div className="col-5 col-lg-5">
                                <Link to={`/products/${item?.product}`}>{item?.name}</Link>
                            </div>

                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p>{item?.price}</p>
                            </div>

                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                <p>{item?.quantity} Piece(s)</p>
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
            </div>

            <div className="col-12 col-lg-3 mt-5">
                <h4 className="my-4">Status</h4>

                <div className="mb-3">
                    <select className="form-select" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>

                <button className="btn btn-primary w-100" onClick={() => handleOrderStatus(order?._id)}>Update Status</button>

                <h4 className="mt-5 mb-3">Order Invoice</h4>
                <Link to={`/invoice/orders/${order?._id}`} className="btn btn-success w-100">
                    <i className="fa fa-print"></i> Generate Invoice
                </Link>
            </div>
        </div>
    );
};

export default ProcessOrders;