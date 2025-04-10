import express from "express";
import eventController from '../controllers/eventController.js';

const router = express.Router();
// const ROUTE = process.env.ROUTE_LOGIN;

// *********************
// event routes: CRUD
// *********************

// event management
router.post('/api/event/register/:id', eventController.eventRegisterController); //created by user id
router.get('/api/event', eventController.eventSearchController);

export default router;