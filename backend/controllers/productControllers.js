import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import APIFilters from "../utils/apiFilters.js";
import { truncates } from "bcryptjs";



// Get All Products => /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res, next) => {

    const resultPerPage = 4; // Number of products per page

    const apiFilters = new APIFilters(Product, req.query).search().filter();
    let products = await apiFilters.query;
    let filteredProductsCount = products.length;

    apiFilters.pagination(resultPerPage);
    products = await apiFilters.query.clone();

    res.status(200).json({
        success: true,
        products,
        filteredProductsCount,
        resultPerPage,
    });
});

// Create New Product => POST /api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {

    req.body.user = req.user.id; // Assuming req.user is set by authentication middleware

    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product,
    });
});

// Get single Product details => POST /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req?.params?.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404)); // Use ErrorHandler for consistent error handling
    }
    res.status(200).json({
        success: true,
        product,
    });
});

// Update Product details => POST /api/v1/products/:id
export const updateProduct = catchAsyncErrors(async (req, res) => {
    let product = await Product.findById(req?.params?.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404)); // Use ErrorHandler for consistent error handling
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {new: true, });   

    res.status(200).json({
        success: true,
        product,
    });
});

// Delete Product => DELETE /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
    let product = await Product.findById(req?.params?.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404)); // Use ErrorHandler for consistent error handling
    }

    product = await Product.deleteOne();   

    res.status(200).json({
        message: "Product deleted successfully",
    });
});

// Create/Update New Product Review => PUT /api/v1/reviews
export const createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req?.user?._id,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404)); // Use ErrorHandler for consistent error handling
    }

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req?.user?._id.toString());

    if (isReviewed) {
        product.reviews.forEach((review) => {
            if(review?.user?.toString() === req?.user?._id.toString()){
                review.rating = rating;
                review.comment = comment;  
            }
        });

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Review added successfully",
    });


});

// Get productReviews => GET /api/v1/reviews
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req?.query?.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404)); // Use ErrorHandler for consistent error handling
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete Product Review => Delete /api/v1/admin/reviews
export const deleteProductReview = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req?.query?.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404)); // Use ErrorHandler for consistent error handling
    }

    const reviews = product.reviews.filter(
        (review) => review._id.toString() !== req?.query?.id.toString());

    const numOfReviews = reviews.length;

    const ratings = 
        numOfReviews === 0 
        ? 0
        : product.reviews.reduce((acc, item) => item.rating + acc, 0) 
        / numOfReviews;

    product = await Product.findByIdAndUpdate(req?.query?.productId, { reviews, ratings, numOfReviews }, { new: true});

    res.status(200).json({
        success: true,
        message: "Review deleted successfully",
        product,
    });


});
