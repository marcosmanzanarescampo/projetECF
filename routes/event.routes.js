import express from "express";
import eventController from '../controllers/eventController.js';

const router = express.Router();
// const ROUTE = process.env.ROUTE_LOGIN;

// *********************
// event routes: CRUD
// *********************

// event management
router.post('/api/event/register/:id', eventController.eventRegisterController);
router.get('/api/event', eventController.eventSearchController);
router.get('/api/event/liked/:email', eventController.eventSearchLikedController);
router.get('/api/event/city/:id', eventController.eventSearchByCityController);

export default router;