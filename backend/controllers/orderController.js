const catchAsyncError = require('../middleware/catchAsyncError')
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const ErrorHandler = require('../utils/ErrorHandler');

exports.placeOrder = catchAsyncError(async(req,res,next)=>{
    const{
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,

    } = req.body
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paid_At:Date.now(),
        user:req.user.id, 
    }) 
    res.status(201).json({
        success:true,
        order
    })
})

exports.getOrderDetails = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        "firstname lastname email"
    )
    if(!order){
        return next(new ErrorHandler("No such order found"),404)
    }
    res.status(201).json({
        success:true,
        order
    })
})

exports.getLoggedInUserOrder = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find({user :req.user.id})
    if(!orders){
        return next(new ErrorHandler("You have not placed any orders yet"),404)
    }
    res.status(201).json({
        success:true,
        orders
    })
})

exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
    const allOrders = await Order.find()
    if(!allOrders){
        return next(new ErrorHandler("No Orders",404))
    }
    let totalAmount = 0
    allOrders.forEach(order => {
        totalAmount += order.totalPrice
    })
    res.status(201).json({
        success:true,
        totalAmount,
        allOrders
    })
})

exports.updateOrderStatus = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("You have not placed any orders yet"),404)
    }
    if(order.orderStatus == 'Delivered'){
        return next(new ErrorHandler("Your order has already deliverd"),400) 
    }
    if(req.body.orderStatus == 'Delivered'){
        await updateStock(order.orderItems[0].product,order.orderItems[0].quantity)
        order.deliveredAt = Date.now()
    }
    order.orderStatus = req.body.orderStatus
    
    await order.save()
    res.status(200).json({
        success:true,
        message:`Status updated successfully to ${req.body.orderStatus}`
    })
})

exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findByIdAndDelete(req.params.id)
    if(!order){
        return next(new ErrorHandler("No such order found"),404)
    }
    res.status(201).json({
        success:true,
        message:"Order Deleted successfully"
    })
})

const updateStock = async(product_id,quantity) => {
    const product = await Product.findById(product_id)
    product.stock = product.stock - quantity
    await product.save({validateBeforeSave:false })
}
