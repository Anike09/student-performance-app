import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Student } from '../entities/Student';
import { Grade } from '../entities/Grade';
import { analyzeRiskAndRecommend } from '../services/recommendationService';
import { analyzePerformance } from '../services/analysisService';

export default {
  async list(req: Request, res: Response) {
    const repo = getRepository(Student);
    const students = await repo.find({ relations: ['grades'] });
    return res.json(students);
  },

  async create(req: Request, res: Response) {
    try {
      const repo = getRepository(Student);
      const { name, matricNo, email } = req.body;
      const student = repo.create({ name, matricNo, email });
      await repo.save(student);
      return res.status(201).json(student);
    } catch (err) {
      return res.status(400).json({ error: 'Could not create student', details: err.message });
    }
  },

  async get(req: Request, res: Response) {
    const repo = getRepository(Student);
    const student = await repo.findOne(req.params.id, { relations: ['grades'] });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    const analysis = analyzeRiskAndRecommend(student.grades || []);
    return res.json({ student, analysis });
  },

  async analysis(req: Request, res: Response) {
    try {
      const analysis = await analyzePerformance(req.params.id);
      return res.json(analysis);
    } catch (err) {
      return res.status(400).json({ error: 'Could not fetch analysis', details: err.message });
    }
  },

  async recommendations(req: Request, res: Response) {
    try {
      const repo = getRepository(Student);
      const student = await repo.findOne(req.params.id, { relations: ['grades'] });
      if (!student) return res.status(404).json({ error: 'Student not found' });
      const recommendations = analyzeRiskAndRecommend(student.grades || []);
      return res.json(recommendations);
    } catch (err) {
      return res.status(400).json({ error: 'Could not fetch recommendations', details: err.message });
    }
  },

  async addGrade(req: Request, res: Response) {
    try {
      const studentRepo = getRepository(Student);
      const gradeRepo = getRepository(Grade);
      const student = await studentRepo.findOne(req.params.id);
      if (!student) return res.status(404).json({ error: 'Student not found' });

      const { courseCode, units, score, semester } = req.body;
      const grade = gradeRepo.create({
        courseCode,
        units: Number(units),
        score: Number(score),
        semester,
        student,
      });
      await gradeRepo.save(grade);

      const updated = await studentRepo.findOne(req.params.id, { relations: ['grades'] });
      return res.status(201).json(updated);
    } catch (err) {
      return res.status(400).json({ error: 'Could not add grade', details: err.message });
    }
  }
};