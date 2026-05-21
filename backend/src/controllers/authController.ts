import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { env } from "../config/env";
import { Student } from "../entities/Student";

const studentRepository = AppDataSource.getRepository(Student);

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

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
      password: hashedPassword,
    });

    await studentRepository.save(student);

    const token = jwt.sign(
      { id: student.id },
      env.jwtSecret,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      student,
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

    const token = jwt.sign(
      { id: student.id },
      env.jwtSecret,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
