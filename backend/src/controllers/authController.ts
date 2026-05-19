import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user'; // Assuming you have a User model defined

class AuthController {
    async register(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }

    async login(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }

    async logout(req: Request, res: Response) {
        // Implement logout functionality if needed
        res.json({ message: 'User logged out' });
    }
}

export default new AuthController();