import { Router } from 'express';
import studentController from '../controllers/studentController';
import authRoutes from './authRoutes';
import courseRoutes from './courseRoutes';
import { authenticateToken } from '../middleware/authmiddleware';

const router = Router();

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);

router.get('/students', studentController.list);
router.post('/students', studentController.create);
router.get('/students/:id', studentController.get);
router.get('/students/:id/analysis', authenticateToken, studentController.analysis);
router.get('/students/:id/recommendations', authenticateToken, studentController.recommendations);
router.post('/students/:id/grades', authenticateToken, studentController.addGrade);

export default router;
