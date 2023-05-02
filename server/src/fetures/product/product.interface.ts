import mongoose,{ Document,Model,Schema} from "mongoose";
import { IUser } from "../auth/auth.interfaces";
import { Request } from "express";

export interface IImage {
    public_id: string;
    url: string;
}

export interface IProduct extends Document{
    name: string;
    description: string;
    price: number;
    ratings: number;
    images: IImage[] | string[] | string;
    category: string;
    Stock: number;
    numOfReviews: number;
    reviews: { 
        user: IUser["_id"];
        name: string;
        rating: number;
        comment:string;
    }[];
    user: IUser["_id"];
    createdAt: Date;
}


// Define the type for the request body
interface ICreateProductRequestBody extends IProduct {
    images: string[] | string;
  }
  
  // Define the type for the authenticated user in the request
  interface IAuthenticatedUser {
    id: string;
    name: string;
    email: string;
  }
  
  // Define the type for the request with the authenticated user
 export interface ICreateProductRequest extends Request {
    body: ICreateProductRequestBody & { user: string };
    user: IAuthenticatedUser;
  }
  
  // Define the type for the product created
 export interface IProductCreated {
    success: true;
    product: IProduct;
  }



  // getAllProducts


 export interface QueryString {
    [key: string]: string;
  }
  
// define types for the response data
export interface ResponseData {
  success: boolean;
  products: IProduct[];
  productsCount: number;
  resultPerPage: number;
  filteredProductsCount: number;
}
