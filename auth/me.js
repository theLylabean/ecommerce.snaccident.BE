import express from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { verifyToken } from './middleware/middleware.js';
import { deleteUser, getUserById, updateUser } from '../db/queries/usersQueries.js';
const router = express.Router();

router.get('/', verifyToken, async ( req, res, next ) => {
  try {
    const user = req.user;
    res.status(201).json(user);
  } catch (error) {
    console.error(error)
    res.json(error);
  }
})

router.get('/:id', verifyToken, async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        console.error('❌ Error in GET /auth/account/:id route:', error.message);
        res.status(500).json({ message: 'Failed to get user by ID.' });
    }
})

router.patch('/:id', verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const { first_name, last_name, email, username, password } = req.body;
  try {
    if (username) {
      return res.status(400).json({ message: 'Username cannot be changed.' });
    }
    if (!first_name && !last_name && !email && !password) {
      return res.status(400).json({ message: 'Please include at least one field to update.' });
    }
    if (first_name && !validator.matches(first_name, /^[a-zA-Z]+$/)) {
      return res.status(400).json({ message: 'First name can only contain letters.' });
    }
    if (last_name && !validator.matches(last_name, /^[a-zA-Z]+$/)) {
      return res.status(400).json({ message: 'Last name can only contain letters.' });
    }
    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }
    let hashedPassword;
    if (password) {
      if (!validator.isStrongPassword(password)) {
        return res.status(400).json({
          message:
            'Password must be at least 8 characters long and include a number, a symbol, an uppercase, and a lowercase letter.',
        });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await updateUser({
      id,
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    console.log(updatedUser);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('❌ Error in PATCH /auth/account/:id route:', error.message);
    res.status(500).json({ message: 'Failed to update user.' });
  }
});

router.delete('/:id', verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('❌ Error in DELETE /auth/account/:id:', error.message);
    return res.status(500).json({ message: 'Failed to delete user.' });
  }
});

export default router;