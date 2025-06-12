import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../db/queries/users.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET /users/:id - Get user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});


// POST /users - Create a new user
router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    const newUser = await createUser(username, password);
    res.status(201).json(newUser); 
  } catch (error) {
    next(error);
  }
});

// PUT /users/:id - Update a user
router.put('/:id', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const updatedUser = await updateUser(req.params.id, username, password);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// DELETE /users/:id - Delete a user by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedUser = await deleteUser(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
