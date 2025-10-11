/*import React, { use, useState } from 'react'
import { useResetPasswordMutation } from '../redux/api/userApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [resetPassword, {isLoading, error, isSuccess}] = useResetPasswordMutation();

    const navigate = useNavigate();

    const params = useParams();

    const {isAuthenticated} = useSelector((state) => state.auth);
  
      useEffect(() => {
        // redirect if logged in
          if (isAuthenticated) {
             navigate("/");
          }
          if(error){
              toast.error(error?.data?.message || "Invalid Email or Password");
          }
          if(isSuccess){
            toast.success("Email sent Successfully");
          }
      }, [error, isAuthenticated, isSuccess]);
  
      const submitHandler = (e) => {
          e.preventDefault();

          if(password !== confirmPassword){
            return toast.error("Password does not match");
    
          }

          const data = { password, confirmPassword };
  
          resetPassword({ token: params.token, body: data });
      };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">New Password</h2>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirm_password_field" className="form-label"
              >Confirm Password</label
            >
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button id="new_password_button" type="submit" className="btn w-100 py-2" disabled= {isLoading}>
            Set Password
          </button>
        </form>
      </div>
    </div>

  )
}

export default ResetPassword*/
