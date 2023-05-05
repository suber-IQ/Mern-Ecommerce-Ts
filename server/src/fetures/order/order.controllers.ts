import HTTP_STATUS from 'http-status-codes';
import { Request,Response, NextFunction } from "express";
import catchAsyncHandler from "../../shared/middleware/catchAsyncError";
import { AllOrdersResponse, GetSingleOrderResponse, IOrder, MYOrdersResponse, NewOrderResponse, OrderUpdateBody } from "./order.interface";
import OrderModel, { updateStock } from "./order.model";
import { AuthRequest } from '../auth/auth.interfaces';
import ErrorHandler from '../../shared/global/errorHandler';


class OrderController {
 
    // 👉 Create new Order
    public newOrder = catchAsyncHandler(async (req: AuthRequest,res: Response<NewOrderResponse>, next: NextFunction) => {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
          }: IOrder = req.body;

          const order: IOrder = await OrderModel.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user.id
          });

          const response: NewOrderResponse = {
            success: true,
            order
          }

          res.status(HTTP_STATUS.OK).json(response);
    });

    // 👉 get Single Order
   public getSingleOrder = catchAsyncHandler(async (req: Request, res: Response<GetSingleOrderResponse>, next: NextFunction) => {
        const order: IOrder | null = await OrderModel.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if(!order){
            return next(new ErrorHandler('Order not found with this Id',HTTP_STATUS.NOT_FOUND));
        }

        const response: GetSingleOrderResponse = {
            success: true,
            order
        };

        res.status(HTTP_STATUS.OK).json(response);
        
    });

  // 👉 get Logged in user order
  public myOrders = catchAsyncHandler(async (req: AuthRequest, res: Response<MYOrdersResponse>,next: NextFunction) => {
      const orders: IOrder[] = await OrderModel.find({ user: req.user?.id})

      const response: MYOrdersResponse = {
        success: true,
        orders
      }
      res.status(HTTP_STATUS.OK).json(response);

  });

    // 👉 get all Orders -- Admin
    public getAllOrders = catchAsyncHandler( async (req: Request, res: Response<AllOrdersResponse>, next: NextFunction) => {
        const orders: IOrder[] = await OrderModel.find();

        let totalAmount = 0;
        
        orders.forEach((order) => {
            totalAmount += order.totalPrice;
        });

        const response: AllOrdersResponse = {
            success: true,
            totalAmount,
            orders
        }

        res.status(HTTP_STATUS.OK).json(response);

    });
   
  // update Order Status -- Admin
   public updateOrder = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
     const order = await OrderModel.findById(req.params.id);

     if(!order){
        return next(new ErrorHandler('Order not found with this Id',HTTP_STATUS.NOT_FOUND));
     }
     
     if(order.orderStatus === "Delivered"){
        return next(
            new ErrorHandler('You have already delivered this order',HTTP_STATUS.BAD_REQUEST)
        );
     };

     const { status }: OrderUpdateBody = req.body;

     if(status === "Shipped"){
        order.orderItems.forEach(async (ord) => {
            await updateStock(ord.product, ord.quantity);
        })
     }

     order.orderStatus = status;

     if(status === "Delivered"){
        order.deliveredAt = new Date();
     }

     await order.save({ validateBeforeSave: false });

     res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Order updated Successfully..."
     })

   });

   // delete order -- Admin
   public deleteOrder = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const order: IOrder | null = await OrderModel.findById(req.params.id);
      
      if(!order){
        return next(new ErrorHandler('Order not found with this Id', HTTP_STATUS.NOT_FOUND));
      }

      await OrderModel.deleteOne({ _id: order._id});

     res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Order deleted Successfully..."
     })

   });

 

}


export { OrderController };
