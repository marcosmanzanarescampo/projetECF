import Router from "express";
import dotenv from 'dotenv';
import userController from '../controllers/userController.js';

const authRouter = Router();

// *********************
// user routes: CRUD
// *********************

authRouter.get(process.env.ROUTE_LOGIN, userController.userLoginController);

export default authRouter;