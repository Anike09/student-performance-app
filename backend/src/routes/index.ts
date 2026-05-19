import { Router } from 'express';
import studentController from '../controllers/studentController';

const router = Router();

router.get('/students', studentController.list);
router.post('/students', studentController.create);
router.get('/students/:id', studentController.get);
router.post('/students/:id/grades', studentController.addGrade);

export default router;