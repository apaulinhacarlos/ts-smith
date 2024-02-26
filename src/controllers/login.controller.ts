import { Request, Response } from 'express';
import loginService from '../services/login.service';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const result = await loginService.login({ username, password });

  return res.status(result.status).json(result.data);
};

export default {
  login,
};