import express from "express";
import likeController from '../controllers/likeController.js';

const router = express.Router();
// const ROUTE = process.env.ROUTE_LOGIN;

// *********************
// like routes: CRUD
// *********************

// event management
router.get('/api/like', likeController.likeSearchController);

// like management
router.get('/api/like/:id', likeController.likeEmailSearchController);
router.post('/api/like', likeController.likeCreateController);


export default router;