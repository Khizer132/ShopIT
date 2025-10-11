import { get } from "mongoose";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";
import { resetPasswordTemplate } from "../utils/emailTemplates.js";
import crypto from "crypto";


// Register a new user => /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
    });

    sendToken(user, 201, res);
});

// Login a user => /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {

    const {email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    
    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

// Logout a user => /api/v1/logout
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});

// forget passworf => /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {

    // find user by email in db
    const user = await User.findOne({ email: req.body.email });

    if(!user) {
        return next(new ErrorHandler("User not found with this email", 404));
    }
    
    // generate reset token
    const resetToken = user.getresetPasswordToken();

    await user.save();

    // create reset password url
    const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

    // send message to user email
    const message = resetPasswordTemplate(user?.name, resetUrl);

    try {
        await sendEmail({
            email: user.email,
            subject: "ShopIT Password Recovery",
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        return next(new ErrorHandler(error.message, 500));
    }

});


// forget passworf => /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    // hash url token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    // if user not found
    if(!user) {
        return next(new ErrorHandler("Pasword reset token is invalid or has been expired", 400));
    }

    // check if password and confirm password match
    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    //Set new password
    user.password = req.body.password;
        
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});


// get currently logged in user details => /api/v1/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req?.user?.id);
    res.status(200).json({
        success: true,
        user,
    });
});

// update password => /api/v1/password/update
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    // check previous user password
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }
    
    user.password = req.body.password;
    await user.save();

    res.status(200).json({
        success: true,
    });
});

// update userProfile => /api/v1/me/update
export const updateUserProfile = catchAsyncErrors(async (req, res, next) => {
    
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
    });

    res.status(200).json({
        user,
    });
});


// get all Users - ADMIN => /api/v1/admin/allUsers
export const allUsers = catchAsyncErrors(async (req, res, next) => {
    
    const users = await User.find();

    res.status(200).json({
        users,
    });
});

// get User Details - ADMIN => /api/v1/admin/users/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`, 400));
    }

    res.status(200).json({
        user,
    });
});

// update userDetails - ADMIN => /api/v1/admin/users/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
    
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
    });

    res.status(200).json({
        user,
    });
});


// delete user - ADMIN => /api/v1/admin/users/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`, 400));
    }

    // TODO: remove avatar from cloudinary
    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});