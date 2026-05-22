import { Router } from "express";
import {
  addCourse,
  deleteCourse,
  editCourse,
  getCourse,
  getCourses,
  getGpaSummary,
  getRecommendations,
} from "../controllers/courseController";
import { authenticateToken } from "../middleware/authmiddleware";

const router = Router();

router.use(authenticateToken);

router.get("/", getCourses);
router.post("/", addCourse);
router.get("/gpa", getGpaSummary);
router.get("/recommendations", getRecommendations);
router.get("/:id", getCourse);
router.put("/:id", editCourse);
router.delete("/:id", deleteCourse);

export default router;
