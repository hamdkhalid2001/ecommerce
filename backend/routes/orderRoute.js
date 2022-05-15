const express = require('express');
const { placeOrder, getOrderDetails, getLoggedInUserOrder, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, isAuthorizeUser } = require('../middleware/auth');

const router = express.Router()

router.route('/order/new').post(isAuthenticatedUser,placeOrder);
router.route('/order/:id').get(isAuthenticatedUser,isAuthorizeUser("admin"),getOrderDetails)
                        .put(isAuthenticatedUser,isAuthorizeUser("admin"),updateOrderStatus)
                        .delete(isAuthenticatedUser,isAuthorizeUser("admin"),deleteOrder)
router.route('/my-orders').get(isAuthenticatedUser,getLoggedInUserOrder)
router.route('/all-orders').get(isAuthenticatedUser,isAuthorizeUser("admin"),getAllOrders)


module.exports = router