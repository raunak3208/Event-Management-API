import userModel from '../model/user-model.js';
import { JWT_SECRET } from '../config/server-config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import UserService from '../service/user-service.js';

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid user or password',
        success: false,
      });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token: token,
      data: user,
      userId: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const createToken = (id,role) => {
  // console.log("ghjk",id,role);
  return jwt.sign({ id:id,role:role }, JWT_SECRET, { expiresIn: '15d' });
};



export { loginUser, registerUser, updateUser, getUser };