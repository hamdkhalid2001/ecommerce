const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please enter product name"],
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    price:{
        type:Number,        
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:[true,'Enter image url']
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    category:{
        type:String,
        required:[true,'Please enter Product Category']
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"]
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
            {
                user:{
                    type:mongoose.Schema.ObjectId,
                    ref:"User",
                    required:true
                },
                name:{
                    type:String,
                    required:true
                },
                rating:{
                    type:Number,
                    required:true
                },
                comment:{
                    type:String,
                    required:true
                }
        }
    ],
    created_At:{
        type:Date,
        default:Date.now()
    },
    featured:{
        type:Boolean
    }    
});

module.exports = mongoose.model("Product",productSchema)