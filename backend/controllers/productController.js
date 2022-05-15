const catchAsyncError = require('../middleware/catchAsyncError')
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/ErrorHandler');
const ApiFeatures = require('../utils/ApiFeatures');

//Create Product
exports.createProduct = catchAsyncError(async (req,res,next) =>{
    req.body.user = req.user.id
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })  
});
exports.getAllProducts = catchAsyncError(async (req,res,next) => {
    
    const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter()
    const productCount = await Product.countDocuments()
    const getProducts = await apiFeatures.query
    if(!getProducts){
        return new ErrorHandler('Product Not Found',400)
    }
    res.status(200).json({
        success:true,
        getProducts,
        productCount:productCount
    })
})
exports.getSingleProduct = catchAsyncError(async(req,res,next)=>{
    const getProduct = await Product.findById(req.params.id)
    
    if(!getProduct){
        console.log("sfsdfsd")
        return next (new ErrorHandler('Product Not Found',400))
    }
    res.status(201).json({
        success:true,
        getProduct
    })
});
exports.editProduct = catchAsyncError(async (req,res,next) =>{
    var product = await Product.findById(req.params.id)
    if(!product){
        return new ErrorHandler('Product Not Found',400)
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body)
    res.status(201).json({
        success:true,
        product
    })  
})

exports.deleteProduct = catchAsyncError(async(req,res,next)=>{
    console.log("Function calling")
    let product = await Product.findById(req.params.id)
    if(!product){
        return new ErrorHandler('Product Not Found',400)
    }
    product.remove()
    res.status(201).json({
        success:true,
        message:'Product Deleted'
    })
})
exports.createProductReview = catchAsyncError(async(req,res,next)=>{
    const{rating,comment,product_id} = req.body
    let name = req.user.firstname + req.user.lastname
    const review = {
        user:req.user.id,
        name:name,
        rating:Number(rating),
        comment
    }
    const product = await Product.findById(product_id)
    
    var pastReview;
    product.reviews.forEach(element => {
        console.log("Current Element",element)
        if(element.user.toString() == req.user.id.toString()){
            pastReview =  element
        }
    });
    if(pastReview){
        pastReview.rating = rating
        pastReview.comment = comment
    }else{
        product.reviews.push(review)
        product.numberOfReviews = product.reviews.length
    }
    let sum = 0;
    product.reviews.forEach(element => {
        sum += element.rating
    })
    product.ratings = sum / product.reviews.length
    await product.save({validateBeforeSave:false})
    res.status(200).json({
         success:true
    })

})

exports.getSingleProductReviews = catchAsyncError(async (req,res,next) =>{
    const getProduct = await Product.findById(req.params.id)
    if(!getProduct){
        return next(new ErrorHandler("No Product Found"),404)
    }
    const getReviews = getProduct.reviews
    if(!getReviews){
        return next(new ErrorHandler("No Reviews For This Product"),404)
    }
    res.status(201).json({
        success:true,
        getReviews
    })
})
exports.getFeaturedProducts = catchAsyncError(async (req,res,next) => {
    const getProducts = await Product.find({featured:true})
    if(!getProducts){
        return next(new ErrorHandler("No Product Found"),404)
    }
    res.status(201).json({
        success:true,
        getProducts
    })
})