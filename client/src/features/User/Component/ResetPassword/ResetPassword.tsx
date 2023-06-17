import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../../../../store";
import { clearErrors } from "../../Actions/User/clear.errors";
import { resetPassword } from "../../Actions/User/reset.password.action";
import { ResetPasswordRequest } from "../../Interfaces/forgot.password.interface";
import CustomHeading from "../../../../components/Heading/CustomHeading";
import CustomInput from "../../../../components/Input/CustomInput";
import CustomLoader from "../../../../components/Loading/CustomLoader";
import CustomButton from "../../../../components/Button/CustomButton";


const ResetPassword = () => {
      const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
      const { error,success,loading } = useSelector((state: RootState) => state.forgotPassword);
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
     dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password Updated Successfully");

      navigate("/login");
    }
  }, [dispatch,error,toast,navigate,success]);

        
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