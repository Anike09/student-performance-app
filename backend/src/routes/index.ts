import { Router } from 'express';
import studentController from '../controllers/studentController';
import { login, signup } from '../controllers/authController';

const router = Router();

router.post('/auth/signup', signup);
router.post('/auth/login', login);

router.get('/students', studentController.list);
router.post('/students', studentController.create);
router.get('/students/:id', studentController.get);
router.get('/students/:id/analysis', studentController.analysis);
router.get('/students/:id/recommendations', studentController.recommendations);
router.post('/students/:id/grades', studentController.addGrade);

export default router;
