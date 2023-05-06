import { Document } from 'mongoose';
import { IUser } from '../auth/auth.interfaces';
import { IProduct } from '../product/product.interface';


interface IShippingInfo{
   address: string;
   city: string;
   state: string;
   country: string;
   pinCode: number;
   phoneNo: number;
}

interface IOrderItem{
    name: string;
    price: number;
    quantity: number;
    image: string;
    product: IProduct['_id'];
}

interface IPaymentInfo{
    id: string;
    status: string;
}

export interface IOrder extends Document{
    shippingInfo: IShippingInfo;
    orderItems: IOrderItem[];
    user: IUser['_id'];
    paymentInfo: IPaymentInfo;
    paidAt: Date;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    orderStatus: string;
    deliveredAt?: Date;
    createdAt: Date;
}


// create new order Response interface
export interface NewOrderResponse {
    success: boolean;
    order: IOrder;
}

// get single Response order interface
export interface GetSingleOrderResponse {
    success: boolean;
    order: IOrder;
}

// get Logged user order
export interface MYOrdersResponse{
    success: boolean;
    orders: IOrder[];
}

// all Order Response interface
export interface AllOrdersResponse{
    success: boolean;
    totalAmount: number;
    orders: IOrder[];
}

// update Order
export interface OrderUpdateBody {
    status: 'Pending' | 'Shipped' | 'Delivered';
  }


