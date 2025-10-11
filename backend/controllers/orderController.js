import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Product from "../models/product.js";


// Create new Order => POST /api/v1/order/new
export const newOrder = catchAsyncErrors(async (req, res) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentMethod,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentMethod,
        paymentInfo,
        user: req.user._id, // Assuming req.user is set by authentication middleware
    });
    res.status(201).json({
        success: true,
        order,
    });
});

// Get current user order => GET /api/v1/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        order,
    });
});

// Get single order details => GET /api/v1/order/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    res.status(200).json({
        success: true,
        order,
    });
});


// Get all orders - ADMIN => GET /api/v1/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find();

    res.status(200).json({
        order,
    });
});

// update orders - ADMIN => PUT /api/v1/admin/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }
    order.orderItems.forEach(async item => {

        // Update stock
        const product = await Product.findById(item.product);
        if(!product){
            return next(new ErrorHandler("Product not found with this Id", 404));
        }
        if( product.stock < item.quantity){
            return next(new ErrorHandler(`Only ${product.stock} items left in stock for product ${product.name}`, 400));
        }

        product.stock -= item.quantity;
        await product.save();

    
    });

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    res.status(200).json({
        order,
    });
});


// delete order => Delete /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
        message: "Order deleted successfully",
    });
});