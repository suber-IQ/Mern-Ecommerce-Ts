import { useState } from "react"
import CustomButton from "../../../components/Button/CustomButton"
import CustomHeading from "../../../components/Heading/CustomHeading"
import CustomInput from "../../../components/Input/CustomInput"
import CustomRouteLink from "../../../components/RouteLink/CustomRouteLink"

// name ,email, password, avatar
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      avatar: file || null,
    }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };




  return (
    <main className="max-w-md mt-2 mx-auto py-4 px-8 bg-primary shadow-lg rounded-lg">
       <CustomHeading children="Sign Up" className="mb-4" level={1} />
        <form onSubmit={handleSubmit}>
           <CustomInput onChange={handleInputChange} value={formData.name}  type="text" name="name" label="Name:" placeholder="Enter Your Name" />
           <CustomInput onChange={handleInputChange} value={formData.email}  type="email" name="email" label="Email:" placeholder="Enter Your Email" />
           <CustomInput onChange={handleInputChange} value={formData.password} type="password" name="password" label="Password:" placeholder="Enter Your Password" />
           <CustomInput onChange={handleInputChange} value={formData.confirmPassword} type="password" name="confirmpassword" label="ConfirmPassword:" placeholder="Enter Your Confirm Password" />
           <CustomInput onChange={handleAvatarChange} label="Avatar" type="file" name="avatar" accept="image/*" className="border-none focus:border" id="avatar"  />

           {formData.avatar && (
              <div className="my-2">
                <img
                  src={URL.createObjectURL(formData.avatar)}
                  alt="Avatar Preview"
                  className="w-20 h-20 rounded-full"
                />
              </div>
            )}
           <div className="flex items-center justify-between">
           <CustomButton type="submit" children="Sign Up" />
           <span>Already Create a Account ? <CustomRouteLink className="text-blue-800" to={"/account/login"}>login</CustomRouteLink></span>
           </div>
        </form>
    </main>
  )
}

export default SignUp