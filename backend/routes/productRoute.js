const express = require('express')
const { getAllProducts , createProduct , editProduct , deleteProduct , getSingleProduct , createProductReview, getSingleProductReviews, getFeaturedProducts} = require('../controllers/productController');
const { isAuthenticatedUser, isAuthorizeUser } = require('../middleware/auth');

const router = express.Router()

router.route('/products').get(getAllProducts);
router.route('/admin/newproduct').post(isAuthenticatedUser, isAuthorizeUser("admin") ,createProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,isAuthorizeUser("admin"),editProduct)
                            .delete(isAuthenticatedUser,isAuthorizeUser("admin"),deleteProduct)
router.route('/product/:id').get(isAuthenticatedUser,getSingleProduct)
router.route('/review').put(isAuthenticatedUser,createProductReview)
router.route('/reviews/:id').get(getSingleProductReviews)
router.route('/featured/products').get(getFeaturedProducts)
module.exports = router