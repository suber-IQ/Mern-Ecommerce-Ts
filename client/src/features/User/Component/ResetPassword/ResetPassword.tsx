import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { resetPassword } from "../../Actions/User/reset.password.action";
import { toast } from "react-toastify";


const ResetPassword = () => {
      const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
      const { error,message,loading } = useSelector((state: RootState) => state.resetPassword);
      const navigate = useNavigate();
      const { token } = useParams();
      const [formData, setFormData] = useState({
            newPassword: '',
            confirmPassword: '',
          });
  const[passwordMatch, setPasswordMatch] = useState(true);
  useEffect(() => {
    if (error) {
     toast.error("Login failed: " + String(error));
      dispatch(clearRessetPasswordErrors());
    }

    if (message?.success) {
      toast.success("Password Updated Successfully");

      navigate("/login");
    }
  }, [dispatch,error,toast,navigate,message?.success]);

        
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name,value } = e.target;
            setFormData((prevFormData) => ({
                  ...prevFormData,
                  [name]: value,
            }));
            if(name === "confirmPassword"){
               setPasswordMatch(value === formData.newPassword);
            }
      }
        

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const resetPasswordData: ResetPasswordRequest = {
        token: token,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      }
      dispatch(resetPassword(resetPasswordData)) 
  }


  return (
    <main className="max-w-md mt-8 mx-auto py-4 px-8 bg-primary shadow-lg rounded-lg">
      <CustomHeading children="Reset Password" className="mb-7"  level={3} />
       <form onSubmit={handleSubmit}>
      <CustomInput
        onChange={handleInputChange}
        value={formData.newPassword}
        type="password"
        name="newPassword"
        label={"New Password"}
        placeholder={"New Password"}
      />
      <CustomInput
        onChange={handleInputChange}
        value={formData.confirmPassword}
        type="password"
        name="confirmPassword"
        label={"Confirm Password"}
        placeholder={"Confirm Password"}
        error={!passwordMatch && "newPassword & confirmPassoword does not match!"}
      />
      {
        loading ? (
          <>
           <CustomLoader />
          </>
        ) : (
          <>
          <CustomButton children="Submit" type="submit" />
          </>
        )
      }
      
    </form>
    </main>
  )
}

export default ResetPassword