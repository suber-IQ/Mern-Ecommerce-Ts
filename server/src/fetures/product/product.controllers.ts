import HTTP_STATUS  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import cloudinary from 'cloudinary';
import catchAsyncHandler from "../../shared/middleware/catchAsyncError";
import ProductModel from "./product.model";
import { ICreateProductRequest, IProduct, IProductCreated, QueryString, ResponseData } from './product.interface';
import ApiFeatures from '../../shared/utils/apiFeatures';


  



class ProductController{

    public createProduct = catchAsyncHandler(async (req: ICreateProductRequest,res: Response<IProductCreated>,next: NextFunction) => {
        let images: string[] = [];
        
        if(typeof req.body.images === 'string'){
            images.push(req.body.images);
        }else{
            images = req.body.images;
        }

        const imagesLinks = [];

        for(let i = 0; i < images.length; i++){
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

       req.body.images = imagesLinks;
       req.body.user = req.user.id;

       const product: IProduct = await ProductModel.create(req.body);
       res.status(HTTP_STATUS.CREATED).json({
        success: true,
        product
       })
    });

    public getAllProducts = catchAsyncHandler(async (req: Request<{},{},{},QueryString>, res: Response<ResponseData>, next: NextFunction) => {
        const resultPerPage = 8;
        const productsCount = await ProductModel.countDocuments();

        const apiFeature = new ApiFeatures(ProductModel.find<IProduct>(),req.query).search().filter();

        let products = await apiFeature.query;

        let filteredProductsCount = products.length;

        apiFeature.pagination(resultPerPage);
    
        products = await apiFeature.query;

        res.status(HTTP_STATUS.OK).json({
            success: true,
            products,
            productsCount,
            resultPerPage,
            filteredProductsCount
        });
    })
}

export { ProductController };