import mongoose from "mongoose";
import ErrorHandler from "../utils/errorHandler.js";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },

        phoneNo: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    orderItems: [
        {
            name: {
                type: String,
                required: true,
            },  
            quantity: {
                type: Number,
                required: true,
                    
            },
            image: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    
    ],

    paymentMethod: {
        type: String,
        required: [true, "Please enter payment method"],
        enum: {
            values: ["COD", "Card"],
            message: "Please select a valid payment method",
        },
    },

    paymentInfo: {
        id: String,
        status: String,
    },

    itemsPrice: {
        type: Number,
        required: true,
    },

    taxPrice: {
        type: Number,
        required: true,
    },

    shippingPrice: {
        type: Number,
        required: true,
    },

    totalPrice: {
        type: Number,
        required: true,
    },

    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
        enum: {
            values: ["Processing", "Shipped", "Delivered"],
            message: "Please select a valid order status",
        },
    },

    deliveredAt: Date,

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);

        