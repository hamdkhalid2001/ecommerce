const express = require('express');
const { signupUser , loginUser, logout, forgetPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, updateUserRole, getAllUsers, deleteUser, createProductReview } = require('../controllers/userController')
const { isAuthenticatedUser, isAuthorizeUser } = require('../middleware/auth');
const router = express.Router()

router.route('/signup').post(signupUser);
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route('/forgetPassword').post(forgetPassword)
router.route('/reset/password/:token').put(resetPassword)
router.route('/mydetails').get(isAuthenticatedUser,getUserDetails)
router.route('/updatePassword').put(isAuthenticatedUser,updateUserPassword)
router.route('/updateProfile').put(isAuthenticatedUser,updateUserProfile)
router.route('/admin/user/:id').put(isAuthenticatedUser, isAuthorizeUser("admin") ,updateUserRole)
                                .delete(isAuthenticatedUser, isAuthorizeUser("admin") ,deleteUser);
router.route('/admin/getUsers').get(isAuthenticatedUser, isAuthorizeUser("admin") ,getAllUsers);

module.exports = router

