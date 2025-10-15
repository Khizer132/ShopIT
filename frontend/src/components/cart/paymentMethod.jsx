import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import CheckoutSteps from './checkoutSteps'
import { calculateOrderPrice } from '../helpers/helper';
import { useCreateNewOrderMutation } from '../../redux/api/orderApi';
import toast from 'react-hot-toast';
import { useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';


const PaymentMethod = () => {

    const [method, setMethod] = useState("");
    const {shippingInfo, cartItems} = useSelector((state) => state.cart);

    const navigate = useNavigate();

    const {  itemsPriceTotal, shippingCharges, tax, totalPrice } = calculateOrderPrice(cartItems);


    const [createNewOrder, {isLoading, error, isSuccess}] = useCreateNewOrderMutation();

    useEffect(() => {
        if(isSuccess){
            navigate("/me/orders?order_success=true");
        }
        if(error){
            toast.error(error?.data?.message || "Something went wrong" );
        }
    }, [isSuccess, error]);
    

    const submitHandler = (e) => {
        e.preventDefault();

        if(method === ""){
            alert("Please select a payment method");
            return;
        }

        if(method === "COD"){
            // Add your COD logic here
            const orderInfo = {
                shippingInfo,
                orderItems: cartItems,
                itemsPrice: itemsPriceTotal, 
                shippingPrice: shippingCharges, 
                taxPrice: tax, 
                totalPrice: totalPrice,
                paymnetInfo: {
                    status: "Not Paid",
                },
                paymentMethod: "COD"
            };

            createNewOrder(orderInfo);
        }

        if(method === "Card"){
            // Add your Card payment logic here
        }
    }

    return (
        <>
            <CheckoutSteps shipping confirmOrder payment />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitHandler}
                    >
                        <h2 className="mb-4">Select Payment Method</h2>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payment_mode"
                                id="codradio"
                                value="COD"
                                onChange={(e) => setMethod("COD")}
                            />
                            <label className="form-check-label" for="codradio">
                                Cash on Delivery
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payment_mode"
                                id="cardradio"
                                value="Card"
                                onChange={(e) => setMethod("Card")}
                            />
                            <label className="form-check-label" for="cardradio">
                                Card - VISA, MasterCard
                            </label>
                        </div>

                        <button id="shipping_btn" type="submit" className="btn py-2 w-100">
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PaymentMethod
