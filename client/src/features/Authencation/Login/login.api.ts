import axios, { AxiosError, AxiosResponse } from "axios";
import { LoginResponse, LoginUserRequest } from "./login.interface";


export const loginUser = async (loginData: LoginUserRequest): Promise<AxiosResponse<LoginResponse>> => {
      try {
            const response = await axios.post<LoginResponse>('/login',loginData);
            return response;
      } catch (error: unknown) {
            if(axios.isAxiosError(error)){
                  throw (error as AxiosError).response;
            }
            throw error;
      }
};  

