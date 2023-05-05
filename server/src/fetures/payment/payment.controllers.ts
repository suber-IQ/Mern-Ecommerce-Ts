import { NextFunction, Request, Response } from "express";
import HTTP_STATUS from 'http-status-codes';
import Stripe from 'stripe';
import catchAsyncHandler from "../../shared/middleware/catchAsyncError";
import { config } from "../../config/config";


interface IPayment {
    amount: number;
    currency: string;
    metadata: {
      company: string;
    };
  }
  
  const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
  });

class PaymentController {
    public processPayment = catchAsyncHandler(async (req: Request,res: Response,next: NextFunction) => {
        const paymentDetails: IPayment = {
           amount: req.body.amount,
           currency: "inr",
           metadata: {
            company: "Ecommerce"
           }
        };

        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(paymentDetails);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            client_secret: paymentIntent.client_secret
        })
    });

    public sendStripeApiKey = catchAsyncHandler(async (req: Request, res: Response,next: NextFunction) => {
        res.status(HTTP_STATUS.OK).json({
            stripeApiKey: config.STRIPE_API_KEY
        })
    })
}


export { PaymentController };