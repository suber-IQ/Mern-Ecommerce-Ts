import HTTP_STATUS from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import catchAsyncHandler from "../../shared/middleware/catchAsyncError";
import ProductModel from "./product.model";
import {
  ICreateProductRequest,
  IImage,
  IProduct,
  IProductCreated,
  IRequesParams,
  QueryString,
  ResponseData,
  Review,
} from "./product.interface";
import ApiFeatures from "../../shared/utils/apiFeatures";
import ErrorHandler from "../../shared/global/errorHandler";


interface IProductt {
    user: string;
    name: string;
    rating: number;
    comment: string;
  }
class ProductController {
  // 👉 Create Product (Admin)
  public createProduct = catchAsyncHandler(
    async (
      req: ICreateProductRequest,
      res: Response<IProductCreated>,
      next: NextFunction
    ) => {
      let images: string[] = [];

      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
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
        product,
      });
    }
  );

  // 👉 Get All Products
  public getAllProducts = catchAsyncHandler(
    async (
      req: Request<{}, {}, {}, QueryString>,
      res: Response<ResponseData>,
      next: NextFunction
    ) => {
      const resultPerPage = 8;
      const productsCount = await ProductModel.countDocuments();

      const apiFeature = new ApiFeatures(
        ProductModel.find<IProduct>(),
        req.query
      )
        .search()
        .filter();

      let products = await apiFeature.query;

      let filteredProductsCount = products.length;

      apiFeature.pagination(resultPerPage);

      products = await apiFeature.query;

      res.status(HTTP_STATUS.OK).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
      });
    }
  );

  // 👉 Get All Product (Admin)
  public getAdminProducts = catchAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const products: IProduct[] = await ProductModel.find();
      res.status(HTTP_STATUS.OK).json({
        success: true,
        products,
      });
    }
  );

  // 👉 Get Product Details
  public getProductDetails = catchAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const product: IProduct | null = await ProductModel.findById(
        req.params.id
      );

      if (!product) {
        return next(
          new ErrorHandler("Product not found", HTTP_STATUS.NOT_FOUND)
        );
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        product,
      });
    }
  );

  // 👉 Update Product (Admin)
  public updateProduct = catchAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let product: IProduct | null = await ProductModel.findById(req.params.id);
      console.log(product);

      if (!product) {
        return next(
          new ErrorHandler("Product not found", HTTP_STATUS.NOT_FOUND)
        );
      }

      // Images Start Here
      let images: string[] = [];

      if (typeof req.body.images == "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      if (images !== undefined) {
        // Deleting Images From cloudinary
        for (let i = 0; i < product.images.length; i++) {
          await cloudinary.v2.uploader.destroy(
            (product.images[i] as IImage).public_id
          );
        }
      }

      const imagesLinks: IImage[] = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      req.body.images = imagesLinks;

      product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res.status(200).json({
        success: true,
        product,
        message: "Update Product Successfully..."
      });
    }
  );

  // 👉 Delete Product(Admin)
  public deleteProduct = catchAsyncHandler(
    async (req: IRequesParams, res: Response, next: NextFunction) => {
      const product: IProduct | null = await ProductModel.findById(
        req.params.id
      );

      if (!product) {
        return next(
          new ErrorHandler("Product not found", HTTP_STATUS.NOT_FOUND)
        );
      }

      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(
          (product.images[i] as IImage).public_id
        );
      }

      await ProductModel.deleteOne({ _id: product._id });

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Product Delete Successfully...",
      });
    }
  );

//   👉 Create Product Review
 public createProductReview = catchAsyncHandler(async (req: Review, res: Response, next: NextFunction) => {
    const { rating, comment, productId } = req.body;

    const review: IProductt = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product: IProduct | null = await ProductModel.findById(productId);

    if(!product){
        return next(new ErrorHandler('Product not found', HTTP_STATUS.NOT_FOUND));
    }

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user.id.toString()
    );

    if(isReviewed){
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user.id.toString()){
                rev.rating = rating;
                rev.comment = comment;
            }
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(HTTP_STATUS.OK).json({
        success: true
    })




 });

//  👉 Get All Reviews of a product
 public getProductReviews = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const product: IProduct | null = await ProductModel.findById(req.query.id);

      if(!product){
        return next(new ErrorHandler('Product not found', HTTP_STATUS.NOT_FOUND));
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        reviews: product.reviews,
      })
 })

 public deleteReview = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const product: IProduct | null = await ProductModel.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler('Product not found',HTTP_STATUS.NOT_FOUND));
      }
    
      const reviews = product.reviews.filter(
        (rev) => rev.user._id.toString() !== req.query.id.toString(),
      );

      let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });
    
  const ratings = reviews.length === 0 ? 0 : avg / reviews.length;
  const numOfReviews = reviews.length;

  const updatedProduct: IProduct | null = await ProductModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    },
  );

  if(!updatedProduct){
    return next(new ErrorHandler('Failed to update product',HTTP_STATUS.INTERNAL_SERVER_ERROR))
  }

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Delete Reviews Successfully..."
  })



 })

}

export { ProductController };
