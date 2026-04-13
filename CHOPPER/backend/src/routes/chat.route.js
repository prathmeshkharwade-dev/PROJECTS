import express from 'express';
import { handleChat, getChatHistoryHandler } from '../controllers/chat.controller.js';

const router = express.Router();

router.post('/', handleChat);
router.get('/history', getChatHistoryHandler);

export default router;