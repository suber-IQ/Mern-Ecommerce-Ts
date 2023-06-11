import { useEffect, useState } from "react"
import CustomButton from "../../../components/Button/CustomButton"
import CustomHeading from "../../../components/Heading/CustomHeading"
import CustomInput from "../../../components/Input/CustomInput"
import CustomRouteLink from "../../../components/RouteLink/CustomRouteLink"
import { ThunkDispatch } from 'redux-thunk';

import {
  DEFAULT_EMAIL_LABEL,
  DEFAULT_PASSWORD_LABEL,
  DEFAULT_EMAIL_PLACEHOLDER,
  DEFAULT_PASSWORD_PLACEHOLDER,
  LOGIN_BUTTON_TEXT,
  CREATE_ACCOUNT_TEXT,
  SIGNUP_LINK_TEXT,
  SIGNUP_ROUTE,
  PRIMARY_TEXT_COLOR,
  FORM_BG_COLOR,
  FORM_SHADOW,
  FORM_ROUNDED,
} from './login.constant';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {toast}  from 'react-toastify';
import { AnyAction } from "@reduxjs/toolkit"
import { loginUser } from "./login.action"
import { RootState } from "../../../store"
import { clearErrors } from "./login.reducer"

const Login = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const { error, isAuthenticated } = useSelector((state: RootState) => state.login);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
     if(error){
      console.log(error);
      
       toast.error("Login failed: " + String(error));
       return () => {
        dispatch(clearErrors());
       };
     }
     if(isAuthenticated){
       navigate("/");
     }
  },[navigate,isAuthenticated,dispatch,error])
 


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };




  return (
    <main className={`max-w-md mt-8 mx-auto py-4 px-8 ${FORM_BG_COLOR} ${FORM_SHADOW} ${FORM_ROUNDED}`}>
    <CustomHeading children="Login" className="mb-4" level={1} />
    {error && <p className="text-red-800">Error: {error}</p>}
    <form onSubmit={handleSubmit}>
      <CustomInput
        onChange={handleInputChange}
        value={formData.email}
        type="email"
        name="email"
        label={DEFAULT_EMAIL_LABEL}
        placeholder={DEFAULT_EMAIL_PLACEHOLDER}
      />
      <CustomInput
        onChange={handleInputChange}
        value={formData.password}
        type="password"
        name="password"
        label={DEFAULT_PASSWORD_LABEL}
        placeholder={DEFAULT_PASSWORD_PLACEHOLDER}
      />
      <div className="flex items-center justify-between">
        <CustomButton type="submit" children={LOGIN_BUTTON_TEXT} />
        <span>
          {CREATE_ACCOUNT_TEXT}{" "}
          <CustomRouteLink className={PRIMARY_TEXT_COLOR} to={SIGNUP_ROUTE}>
            {SIGNUP_LINK_TEXT}
          </CustomRouteLink>
        </span>
      </div>
    </form>
  </main>
  )
}

export default Login