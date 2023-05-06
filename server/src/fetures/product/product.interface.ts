import { Document} from 'mongoose';
import { IUser } from '../auth/auth.interfaces';
import { Request } from 'express';

export interface IImage {
    public_id: string;
    url: string;
}

export interface IProduct extends Document{
    name: string;
    description: string;
    price: number;
    ratings: number;
    images: IImage[];
    category: string;
    Stock: number;
    numOfReviews: number;
    reviews: {
        user: IUser['_id'];
        name: string;
        rating: number;
        comment:string;
    }[];
    user: IUser['_id'];
    createdAt: Date;
}



  // Define the type for the authenticated user in the request
 export interface IAuthenticatedUser {
    id: string;
    name: string;
    email: string;
  }

  // Define the type for the request with the authenticated user
 export interface ICreateProductRequest extends Request {
    user?: {
      id: string;
    }
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


// Define the type for the request parameters like id
export interface IRequesParams extends Request {
  id: string;
}

// create Reveiws interface
export interface ReviewRequest extends Request {
  user?: {
      id: string;
      name: string;
  };
  productId?: string;
  rating?: number;
  comment?: string;
}

