import  express  from "express";
import  authRoutes from "./auth.routes.js";

const ROUTE = process.env.ROUTE_USER;

const router = express.Router();

// user routes
router.use('/auth', authRoutes);

export default router;