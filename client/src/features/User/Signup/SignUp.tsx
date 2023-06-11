import { useEffect, useState } from "react"
import CustomButton from "../../../components/Button/CustomButton"
import CustomHeading from "../../../components/Heading/CustomHeading"
import CustomInput from "../../../components/Input/CustomInput"
import CustomRouteLink from "../../../components/RouteLink/CustomRouteLink"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { signUpUser } from "./signup.action"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { clearErrors } from "./signup.reducer"
import { RootState } from "../../../store"
import { useNavigate } from "react-router-dom"
import CustomLoader from "../../../components/Loading/CustomLoader"
import { LOGIN_ROUTE, SIGNUP_AVATAR_LABLE, SIGNUP_AVATAR_NAME, SIGNUP_CONFIRM_PASSWORD_LABLE, SIGNUP_CONFIRM_PASSWORD_NAME, SIGNUP_EMAIL_LABLE, SIGNUP_EMAIL_NAME, SIGNUP_FROM_REDIRECT, SIGNUP_HEADING, SIGNUP_NAME_LABLE, SIGNUP_NAME_NAME, SIGNUP_PASSWORD_LABLE, SIGNUP_PASSWORD_NAME, SIGNUP_PLACEHOLDER_EMAIL, SIGNUP_PLACEHOLDER_NAME, SIGNUP_SUBMIT_BUTTON_NAME } from "./signup.constant"

// name ,email, password, avatar
const SignUp = () => {
  const { error,loading, isAuthenticated } = useSelector((state: RootState) => state.signup);

  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: '',
  });
  const[passwordMatch, setPasswordMatch] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if(name === "confirmPassword"){
      setPasswordMatch(value === formData.password);
    }
  };
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          avatar: reader.result as string, // Convert the result to string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        avatar: '', // Reset to an empty string if no file is selected
      }));
    }
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
     const { name, email, password, avatar} = formData;
    dispatch(signUpUser({ name,email,password,avatar}));
  };

  useEffect(() => {
    if (error) {
      toast.error("Login failed: " + String(error));
      return () => {
        dispatch(clearErrors());
      };
    }
    if (isAuthenticated) {
      navigate(SIGNUP_FROM_REDIRECT);
    }
  }, [navigate, isAuthenticated, dispatch, error]);
 


  return (
    <main className="max-w-md mt-2 mx-auto py-4 px-8 bg-primary shadow-lg rounded-lg">
       <CustomHeading children={SIGNUP_HEADING} className="mb-4" level={1} />
        <form onSubmit={handleSubmit}>
           <CustomInput onChange={handleInputChange} value={formData.name}  type="text" name={SIGNUP_NAME_NAME} label={SIGNUP_NAME_LABLE} placeholder={SIGNUP_PLACEHOLDER_NAME} />
           <CustomInput onChange={handleInputChange} value={formData.email}  type="email" name={SIGNUP_EMAIL_NAME} label={SIGNUP_EMAIL_LABLE} placeholder={SIGNUP_PLACEHOLDER_EMAIL} />
           <CustomInput onChange={handleInputChange} value={formData.password} type="password" name={SIGNUP_PASSWORD_NAME} label={SIGNUP_PASSWORD_LABLE} placeholder={SIGNUP_PASSWORD_LABLE} />

           <CustomInput onChange={handleInputChange} value={formData.confirmPassword} type="password" name={SIGNUP_CONFIRM_PASSWORD_NAME} label={SIGNUP_CONFIRM_PASSWORD_LABLE} placeholder={SIGNUP_CONFIRM_PASSWORD_LABLE} error={!passwordMatch && "Password do not match"} />

           <CustomInput onChange={handleAvatarChange} label={SIGNUP_AVATAR_LABLE} type="file" name={SIGNUP_AVATAR_NAME} accept="image/*" className="border-none focus:border" id="avatar"  />

           {formData.avatar && (
              <div className="my-2">
                <img
                  src={formData.avatar}
                  alt="Avatar Preview"
                  className="w-20 h-20 rounded-full"
                />
              </div>
            )}
           <div className="flex items-center justify-between">

{
  loading ? (<CustomLoader />) : (
    <CustomButton type="submit" children={SIGNUP_SUBMIT_BUTTON_NAME} />

  )
}           
           <span>Already Create a Account ? <CustomRouteLink className="text-blue-800" to={LOGIN_ROUTE}>login</CustomRouteLink></span>
           </div>
        </form>
    </main>
  )
}

export default SignUp