import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//route to Register a new user
router.post('/register', newUserValidator, userController.newUserRegistration);

//route to Login an user
router.post('/logins', userController.loginUser);

//route to Forgot password
router.post('/forgotpwd', userController.forgotPassword);
//route to Reset password
router.put('/resetpwd', userAuth, userController.resetPassword);





export default router;
