import  { Router }  from "express";
import  userRoutes from './user.routes.js';
import  eventRoutes from './event.routes.js';

const router = Router();

// routes
router.use(userRoutes);
router.use(eventRoutes);

export default router;