// controllers/userController.js

import User from '../models/userModel.js';
import { errorResponse } from '../utils/errorResponse.js';

// Create a user
export const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    // Validate required fields
    if (!name || !email) {
      return next(errorResponse(400, 'Name and email are required.'));
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorResponse(400, 'Email already exists.'));
    }

    const user = new User({ name, email });
    const createdUser = await user.save();
    return res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
};
