import { Course } from "../entities/Course";
import { calculateGPA } from "./gpaUtils";

export interface Recommendation {
  type: "LOW_GPA" | "WEAK_COURSES" | "REPEATED_LOW_SCORES" | "DECLINING_GPA";
  message: string;
  courses?: Array<{
    courseCode: string;
    courseName: string;
    score: number;
  }>;
}

const LOW_SCORE_THRESHOLD = 50;

const groupByTerm = (courses: Course[]) => {
  const terms = new Map<string, Course[]>();

  courses.forEach((course) => {
    const key = `${course.session}::${course.semester}`;
    const existingCourses = terms.get(key) || [];
    terms.set(key, [...existingCourses, course]);
  });

  return Array.from(terms.entries()).map(([key, termCourses]) => {
    const [session, semester] = key.split("::");
    return {
      session,
      semester,
      courses: termCourses,
      gpa: calculateGPA(termCourses).gpa,
    };
  });
};

export const getWeakCourses = (courses: Course[]) =>
  courses.filter((course) => course.score < LOW_SCORE_THRESHOLD);

export const getRepeatedLowScores = (courses: Course[]) => {
  const lowScoreGroups = new Map<string, Course[]>();

  getWeakCourses(courses).forEach((course) => {
    const existingCourses = lowScoreGroups.get(course.courseCode) || [];
    lowScoreGroups.set(course.courseCode, [...existingCourses, course]);
  });

  return Array.from(lowScoreGroups.values()).filter(
    (courseGroup) => courseGroup.length > 1
  );
};

export const hasDecliningGPA = (courses: Course[]) => {
  const termGpas = groupByTerm(courses);

  if (termGpas.length < 2) {
    return false;
  }

  return termGpas[termGpas.length - 1].gpa < termGpas[termGpas.length - 2].gpa;
};

export const generateRecommendations = (courses: Course[]) => {
  const recommendations: Recommendation[] = [];
  const { gpa } = calculateGPA(courses);
  const weakCourses = getWeakCourses(courses);
  const repeatedLowScores = getRepeatedLowScores(courses);
  const decliningGPA = hasDecliningGPA(courses);

  if (gpa < 2.0) {
    recommendations.push({
      type: "LOW_GPA",
      message:
        "Your GPA is below 2.0. Increase your weekly study hours and create a consistent revision schedule.",
    });
  }

  if (weakCourses.length > 0) {
    recommendations.push({
      type: "WEAK_COURSES",
      message:
        "You have weak courses. Attend tutorials, join study groups, and review past questions for these courses.",
      courses: weakCourses.map((course) => ({
        courseCode: course.courseCode,
        courseName: course.courseName,
        score: course.score,
      })),
    });
  }

  if (repeatedLowScores.length > 0) {
    recommendations.push({
      type: "REPEATED_LOW_SCORES",
      message:
        "Some courses show repeated low scores. Prioritize these courses and seek lecturer or tutor support early.",
      courses: repeatedLowScores.flat().map((course) => ({
        courseCode: course.courseCode,
        courseName: course.courseName,
        score: course.score,
      })),
    });
  }

  if (decliningGPA) {
    recommendations.push({
      type: "DECLINING_GPA",
      message:
        "Your GPA is declining. Improve time management with a weekly timetable and earlier assignment preparation.",
    });
  }

  return {
    gpa,
    weakCourses,
    repeatedLowScores,
    decliningGPA,
    recommendations,
  };
};
