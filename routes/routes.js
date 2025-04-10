import  { Router }  from "express";
import  userRoutes from './user.routes.js';

const router = Router();


// user routes
router.use(userRoutes);

export default router;