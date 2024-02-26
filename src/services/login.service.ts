import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../database/models/user.model';
import { Login } from '../types/Login';

const secret = process.env.JWT_SECRET || 'secret';

const login = async ({ username, password } : Login) : Promise<any> => {
  const foundUser = await UserModel.findOne(
    { 
      where: { username },
    },
  );
  
  if (!foundUser || !bcrypt.compareSync(password, foundUser.dataValues.password)) {
    return { status: 401, data: { message: 'Username or password invalid' } };
  }
      
  const token = jwt.sign(
    { id: foundUser.dataValues.id, username: foundUser.dataValues.username },
    secret,
    { expiresIn: '7d', algorithm: 'HS256' },
  );

  return { status: 200, data: { token } };
};

export default {
  login,
};