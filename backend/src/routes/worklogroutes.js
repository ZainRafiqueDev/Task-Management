import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { addWorkLog, listWorkLogs } from '../controllers/worklogController.js';

const router = Router();

router.use(protect);

router.post('/project/:projectId', addWorkLog); // any member (or TL/admin) in project can post
router.get('/project/:projectId', listWorkLogs);

export default router;