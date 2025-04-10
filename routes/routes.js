import  { Router }  from "express";
import  userRoutes from './user.routes.js';
import  eventRoutes from './event.routes.js';
import  likeRoutes from './like.routes.js';

const router = Router();

// routes
router.use(userRoutes);
router.use(eventRoutes);
router.use(likeRoutes);

export default router;