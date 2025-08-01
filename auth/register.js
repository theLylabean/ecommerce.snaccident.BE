import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import validator from 'validator';
import { createUsers, newEmailCheck, newUsernameCheck } from '../db/queries/usersQueries.js';
const router = express.Router();
const SECRET = process.env.JWT_SECRET;

router.post('/', async( req, res, next ) => {
    const { first_name, last_name, email, username, password } = req.body;
    try {
        const existingUsername = await newUsernameCheck(username);
        const existingEmail = await newEmailCheck(email);
        if (existingUsername) {
            return res.status(409).json({ message: 'Username already exists.' });
        }
        if (existingEmail) {
            return res.status(409).json({ message: 'Email already exists.' });
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
        const newUser = await createUsers(first_name, last_name, email, username, hashedPassword);
        const token = jwt.sign(
            { id: newUser.id, firstName: newUser.first_name, lastName: newUser.last_name, email: newUser.email, username: newUser.username }, SECRET 
        );
        res.status(201).json({
            token,
            user:
            { id: newUser.id, firstName: newUser.first_name, lastName: newUser.last_name, email: newUser.email, username: newUser.username }
        })
    } catch (error) {
        console.error('❌ Registration error:', error);
        res.status(500).json({ message: 'Failed to register new User' });
    }
});

export default router;