import express from 'express';
import { protectRoutes } from '../middlewares/auth.middleware.js';
import { getStreamToken } from '../controllers/chat.controller.js';

const router = express.Router();

// Define the route for getting the stream token
router.get('/token' ,protectRoutes, getStreamToken);

// Export the router
export default router;