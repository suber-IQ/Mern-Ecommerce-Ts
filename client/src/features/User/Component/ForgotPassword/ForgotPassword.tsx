import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { SIGNUP_LINK_TEXT, SIGNUP_ROUTE } from "../Login/login.constant";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import CustomHeading from "../../../../components/Heading/CustomHeading";
import { clearErrors } from "../../Actions/User/clear.errors";
import CustomInput from "../../../../components/Input/CustomInput";
import CustomRouteLink from "../../../../components/RouteLink/CustomRouteLink";
import CustomLoader from "../../../../components/Loading/CustomLoader";
import CustomButton from "../../../../components/Button/CustomButton";
import { forgotPassword } from "../../Actions/User/forgot.password.action";

const ForgotPassword = () => {
      const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
    const { error,loading, message } = useSelector((state: RootState) => state.forgotPassword);
     
      const[email,setEmail] = useState("");


          const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(forgotPassword({email}));
          };

          useEffect(() => {
            if (error) {
                  console.log(error);
            
                  toast.error("Login failed: " + String(error));
                  return () => {
                    dispatch(clearErrors());
                  };
                }
               
            if (message) {
              toast.success(message);
            }
          }, [dispatch, error, toast,message]);
        
        
  return (
      <main className={`max-w-md mt-8 mx-auto py-4 px-8 bg-primary shadow-lg rounded-lg`}>
      <div className="flex items-center justify-between mb-4">
      <CustomHeading children="Forgot Password"  level={3} />
      <span className="flex items-center border-2 animate-pulse px-3 py-1 space-x-1">
            <CustomRouteLink className="text-3xl font-medium" to={SIGNUP_ROUTE}>
              {SIGNUP_LINK_TEXT} 
            </CustomRouteLink>
            <BsFillArrowUpRightCircleFill size="24" color="blue" />
      </span>
      </div>
      {error && <p className="text-red-800">Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <CustomInput
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Your Email"
          required
          name="email"
          value={email}
        
        />
        <div className="flex items-center justify-between">
        {
    loading ? (<CustomLoader />) : (
      <CustomButton type="submit" value="send" children={"Forgot Password"} />
  
    )
  } 
          <span className="animate-bounce">
          <CustomRouteLink className="text-blue-800 text-md" to={"/login"} children={"Login here ? "} />
          </span>
          
        </div>
      </form>
    </main>
  )
}

export default ForgotPassword