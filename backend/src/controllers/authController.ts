import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { env } from "../config/env";
import { Student } from "../entities/Student";
import { AuthRequest } from "../middleware/authmiddleware";

const studentRepository = AppDataSource.getRepository(Student);

const publicStudent = (student: Student) => ({
  id: student.id,
  email: student.email,
  username: student.username,
  name: student.name,
  createdAt: student.createdAt,
});

const createToken = (student: Student) =>
  jwt.sign({ id: student.id, email: student.email }, env.jwtSecret, {
    expiresIn: "7d",
  });

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, username, password, name } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        message: "Email, username, and password are required",
      });
    }

    const existingUser = await studentRepository.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = studentRepository.create({
      email,
      username,
      name,
      password: hashedPassword,
    });

    await studentRepository.save(student);

    const token = createToken(student);

    res.status(201).json({
      message: "Signup successful",
      token,
      student: publicStudent(student),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const student = await studentRepository.findOne({
      where: { email },
    });

    if (!student || !student.password) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = createToken(student);

    res.status(200).json({
      message: "Login successful",
      token,
      student: publicStudent(student),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

export const me = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user?.id;

    if (!studentId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const student = await studentRepository.findOne({
      where: { id: Number(studentId) },
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.json({
      student: publicStudent(student),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
