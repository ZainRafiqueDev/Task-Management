import { Router } from 'express';
import { protect, requireRoles } from '../middleware/auth.js';
import { createTask, listTasks, reorderTasks, updateTask } from '../controllers/taskController.js';

const router = Router();

router.use(protect);

router.get('/project/:projectId', listTasks);
router.post('/project/:projectId', requireRoles('admin', 'teamlead'), createTask);
router.post('/project/:projectId/reorder', requireRoles('admin', 'teamlead'), reorderTasks);
router.patch('/:taskId', updateTask);

export default router;