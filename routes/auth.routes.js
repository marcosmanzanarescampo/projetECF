import express from "express";
import dotenv from 'dotenv';
import userController from '../controllers/userController.js';

const authRouter = express.Router();

const ROUTE = process.env.ROUTE_LOGIN;


// *********************
// user routes: CRUD
// *********************

console.log('serving /login');


// user login
authRouter.post('/login', userController.userLoginController);

export default authRouter;