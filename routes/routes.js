import { Router } from "express";
import  authRoutes from "./auth.routes.js";

const router = Router();

const routes = () => {
    router.use(authRoutes);
}

export default routes;