import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
  const existedUser = await User.findOne({ where: { email } });
  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, credits: 60 });
  
  const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
  );

  res.status(201).json(
      new ApiResponse(201, { userId: user.id, token, user: { id: user.id, name: user.name, email: user.email, credits: user.credits } }, "User created successfully")
  );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  
  if (!user) {
      throw new ApiError(404, "User not found");
  }

  if (!user.password && user.googleId) {
      throw new ApiError(400, "Please login with Google");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
      throw new ApiError(401, "Invalid password");
  }

  const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
  );

  res.json(
      new ApiResponse(200, {
          token,
          user: { 
              id: user.id, 
              name: user.name, 
              email: user.email, 
              credits: user.credits,
              avatar: user.avatar
          }
      }, "Login successful")
  );
});

const googleAuthCallback = asyncHandler(async (req, res) => {
    const user = req.user;
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    // Redirect to frontend with token
    res.redirect(`http://localhost:5173/oauth/callback?token=${token}`);
});

export { register, login, googleAuthCallback };
