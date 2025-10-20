import { Router } from 'express';
import { joinWaitlist } from '../controllers/waitlist.controller';

const router = Router();

// Define the endpoint
// POST /api/waitlist
router.post('/waitlist', joinWaitlist);

export default router;