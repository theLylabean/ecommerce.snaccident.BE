import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../db/queries/users.js';
import { newUserCheck } from '../middleware.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from '../db/client.js';

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'supersecretkey';

// POST /login - User login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // 1. Validate input
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required." });
    }

    // 2. Find user in DB
    const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // 3. Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // 4. Create token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET,
      { expiresIn: '1h' }
    );

    // 5. Return token and user info
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });

  } catch (err) {
    next(err);
  }
});

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
router.post('/', newUserCheck, async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // 1. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Create user
    const newUser = await createUser(username, hashedPassword);

    // 3. Generate token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      SECRET,
      { expiresIn: '1h' }
    );

    // 4. Return user info and token
    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username
      }
    });
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await updateUser(req.params.id, username, hashedPassword);

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
