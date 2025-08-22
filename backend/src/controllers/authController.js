import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import { User } from '../model/User.js';
import generateToken  from '../utils/genToken.js';
// import { validationResult } from 'express-validator';





export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });

  const user = await User.create({ name, email, password, role });

  // include user info in the token payload
  const token = generateToken({ id: user._id, email: user.email, role: user.role });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,  // 🔑 return token to frontend
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

// ================= Login =================
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // include user info in the token payload
  const token = generateToken({ id: user._id, email: user.email, role: user.role });

  res.status(200).json({
    success: true,
    message: "User login successful",
    token,  // 🔑 return token to frontend
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

// ================= Get Current User =================
export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});
