import { Request, Response } from 'express';

// Minimal auth stub to avoid unused external dependencies in this project.
class AuthController {
  async register(_req: Request, res: Response) {
    res.status(501).json({ message: 'Auth register not implemented' });
  }

  async login(_req: Request, res: Response) {
    res.status(501).json({ message: 'Auth login not implemented' });
  }

  async logout(_req: Request, res: Response) {
    res.status(200).json({ message: 'Logged out (noop)' });
  }
}

export default new AuthController();
