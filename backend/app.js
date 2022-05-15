const express = require('express')
const error = require('./middleware/error')
const app = express()
const productRoutes = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const orderRoute = require('./routes/orderRoute')
const cookieParser = require('cookie-parser')
const cors = require('cors');
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000'
}));
//Routes for products
app.use(productRoutes)
//Routes for user
app.use(userRoute)
//Routes for order
app.use(orderRoute)
//Middleware for errors
app.use(error)
module.exports = app;