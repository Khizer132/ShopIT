import express from "express";
const router = express.Router();

import { deleteProductReview, getProductReviews, createProductReview, deleteProduct, getProductDetails, getProducts, newProduct, updateProduct } from "../controllers/productControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

router.route("/products").get( getProducts);
router.route("/admin/products").post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

router.route("/products/:id").get(getProductDetails);

router.route("/admin/products/:id").put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.route("/admin/products/:id").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);


// product review routes
router.route("/reviews")
    .get(isAuthenticatedUser, getProductReviews)
    .put(isAuthenticatedUser, createProductReview);
router.route("/admin/reviews").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProductReview);

export default router;
