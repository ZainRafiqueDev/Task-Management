import { Router } from 'express';
import { User } from './src/model/User.js'; // make sure path & name match

const router = Router();

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const users = await User.find().populate('projects');
  res.json(users);
});

export default router;
