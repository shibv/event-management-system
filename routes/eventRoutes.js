import express from 'express';
import { getAllEvents, createEvent, joinEvent, cancelParticipation , getEventParticipants} from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAllEvents);
router.post('/', createEvent);
router.post('/:id/join', joinEvent);
router.post('/:id/cancel', cancelParticipation);
router.get('/:id/participants', getEventParticipants);

export default router;
