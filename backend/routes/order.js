import express from "express";
const router = express.Router();

import { newOrder, getOrderDetails, myOrders, allOrders, updateOrder, deleteOrder, getSales } from "../controllers/orderController.js";
import {isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/me/orders").get(isAuthenticatedUser, myOrders);

// Admin Routes
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);
router.route("/admin/orders/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder);
router.route("/admin/orders/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

router.route("/admin/get_sales").get(isAuthenticatedUser, authorizeRoles("admin"), getSales);


export default router;