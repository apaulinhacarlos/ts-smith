import { Request, Response } from 'express';
import usersService from '../services/users.service';

const listUsers = async (req: Request, res: Response) => {
  const users = await usersService.listUsers();
  
  return res.status(200).json(users);
};

export default {
  listUsers,
};