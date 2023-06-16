import { useEffect, useState } from "react"
import { ThunkDispatch } from 'redux-thunk';

import {
  DEFAULT_EMAIL_LABEL,
  DEFAULT_PASSWORD_LABEL,
  DEFAULT_EMAIL_PLACEHOLDER,
  DEFAULT_PASSWORD_PLACEHOLDER,
  LOGIN_BUTTON_TEXT,
  SIGNUP_LINK_TEXT,
  SIGNUP_ROUTE,
  FORM_BG_COLOR,
  FORM_SHADOW,
  FORM_ROUNDED,
} from './login.constant';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { AnyAction } from "@reduxjs/toolkit"
import { loginUser } from "../../Actions/User/login.action"
import { RootState } from "../../../store"
import { clearErrors } from "./login.reducer"
import CustomLoader from "../../../components/Loading/CustomLoader"
import { BsFillArrowUpRightCircleFill } from "react-icons/bs"

const Login = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const { error, loading, isAuthenticated } = useSelector((state: RootState) => state.login);
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
    if (error) {
      console.log(error);

      toast.error("Login failed: " + String(error));
      return () => {
        dispatch(clearErrors());
      };
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated, dispatch, error]);



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };




  return (
    <main className={`max-w-md mt-8 mx-auto py-4 px-8 ${FORM_BG_COLOR} ${FORM_SHADOW} ${FORM_ROUNDED}`}>
      <div className="flex items-center justify-between mb-4">
        <CustomHeading children="Login" level={1} />
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
          {
            loading ? (<CustomLoader />) : (
              <CustomButton type="submit" children={LOGIN_BUTTON_TEXT} />

            )
          }
          <span>
            <CustomRouteLink className="text-blue-800 text-md" to={"/password/forgot"} children={"forgot Password ?"} />
          </span>

        </div>
      </form>
    </main>
  )
}

export default Login


{/* <span>
          {CREATE_ACCOUNT_TEXT}
          <CustomRouteLink className={PRIMARY_TEXT_COLOR} to={SIGNUP_ROUTE}>
            {SIGNUP_LINK_TEXT}
          </CustomRouteLink>
        </span> */}