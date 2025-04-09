import express from "express";
import userController from '../controllers/userController.js';

const router = express.Router();
// const ROUTE = process.env.ROUTE_LOGIN;

// *********************
// user routes: CRUD
// *********************

// user login
router.post('/api/user/signin', userController.userSignInController);
router.post('/api/user/register', userController.userRegisterController);

export default router;