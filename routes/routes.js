import  { Router }  from "express";
import  userRoutes from './user.routes.js';

const router = Router();

console.log("routes.js");

// user routes
router.use(userRoutes);

export default router;