import { Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Course } from "../entities/Course";
import { Student } from "../entities/Student";
import { AuthRequest } from "../middleware/authmiddleware";
import { calculateCGPA, calculateGPA, scoreToGrade } from "../utils/gpaUtils";
import { generateRecommendations } from "../utils/recommendationUtils";

const courseRepository = AppDataSource.getRepository(Course);
const studentRepository = AppDataSource.getRepository(Student);

const getStudentId = (req: AuthRequest) => req.user?.id;

const findOwnedCourse = async (courseId: number, studentId: number) =>
  courseRepository.findOne({
    where: {
      id: courseId,
      student: { id: studentId },
    },
    relations: ["student"],
  });

export const getCourses = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = getStudentId(req);

    if (!studentId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const courses = await courseRepository.find({
      where: { student: { id: studentId } },
      order: { id: "DESC" },
    });

    return res.json({ courses });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getCourse = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = getStudentId(req);

    if (!studentId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const course = await findOwnedCourse(Number(req.params.id), studentId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.json({ course });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const addCourse = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = getStudentId(req);

    if (!studentId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      courseCode,
      courseName,
      score,
      creditUnit,
      semester,
      session,
    } = req.body;

    if (
      !courseCode ||
      !courseName ||
      score === undefined ||
      creditUnit === undefined ||
      !semester ||
      !session
    ) {
      return res.status(400).json({ message: "All course fields are required" });
    }

    const student = await studentRepository.findOne({
      where: { id: studentId },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const course = courseRepository.create({
      courseCode,
      courseName,
      score: Number(score),
      grade: scoreToGrade(Number(score)),
      creditUnit: Number(creditUnit),
      semester,
      session,
      student,
    });

    await courseRepository.save(course);

    return res.status(201).json({
      message: "Course added successfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const editCourse = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = getStudentId(req);

    if (!studentId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const course = await findOwnedCourse(Number(req.params.id), studentId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const {
      courseCode,
      courseName,
      score,
      creditUnit,
      semester,
      session,
    } = req.body;

    const nextScore = score === undefined ? course.score : Number(score);

    courseRepository.merge(course, {
      courseCode: courseCode ?? course.courseCode,
      courseName: courseName ?? course.courseName,
      score: nextScore,
      grade: scoreToGrade(nextScore),
      creditUnit:
        creditUnit === undefined ? course.creditUnit : Number(creditUnit),
      semester: semester ?? course.semester,
      session: session ?? course.session,
    });

    await courseRepository.save(course);

    return res.json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getGpaSummary = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = getStudentId(req);

    if (!studentId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { semester, session } = req.query;

    const courses = await courseRepository.find({
      where: { student: { id: studentId } },
      order: { session: "ASC", semester: "ASC", id: "ASC" },
    });

    const filteredCourses = courses.filter((course) => {
      const semesterMatches = semester
        ? course.semester === String(semester)
        : true;
      const sessionMatches = session ? course.session === String(session) : true;

      return semesterMatches && sessionMatches;
    });

    return res.json({
      gpa: calculateGPA(filteredCourses),
      cgpa: calculateCGPA(courses),
      courses: filteredCourses.map((course) => ({
        ...course,
        grade: course.grade || scoreToGrade(course.score),
      })),
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getRecommendations = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = getStudentId(req);

    if (!studentId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const courses = await courseRepository.find({
      where: { student: { id: studentId } },
      order: { session: "ASC", semester: "ASC", id: "ASC" },
    });

    return res.json(generateRecommendations(courses));
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const deleteCourse = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = getStudentId(req);

    if (!studentId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const course = await findOwnedCourse(Number(req.params.id), studentId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await courseRepository.remove(course);

    return res.json({ message: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
