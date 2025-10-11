import express from "express";
import { forgotPassword, loginUser, logoutUser, registerUser, resetPassword, getUserProfile, updatePassword, updateUserProfile, allUsers, getUserDetails, updateUser, deleteUser } from "../controllers/authController.js";
import { get } from "mongoose";
const router = express.Router();

import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// Admin Routes
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles('admin'),  allUsers);
router.route("/admin/users/:id")
    .get(isAuthenticatedUser, authorizeRoles('admin'),  getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'),  updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'),  deleteUser);

export default router;
