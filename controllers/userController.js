import User from '../models/userModel.js';


// Create a new user
export const createUser = asyncHandler(async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({
          name,
          email,
        });
        const createdUser = await user.save();
        res.status(201).json(createdUser);
    } catch (error) {
        next(error)
    }
});
