import express from 'express';
import { createEvent, joinEvent, cancelParticipation } from '../controllers/eventController.js';

const router = express.Router();

router.post('/', createEvent);
router.post('/:id/join', joinEvent);
router.post('/:id/cancel', cancelParticipation);

export default router;
