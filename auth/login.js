import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getLogin } from '../db/queries/usersQueries.js';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
const SECRET = process.env.JWT_SECRET;
const router = express.Router();


router.post('/', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        if (!username || !password ) {
            return res.status(400).json({ message: 'Username and password required.' });
        }
        const userLogin = await getLogin(username);
        const user = userLogin.rows[0];
        if ( !user ) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPWMatch = await bcrypt.compare(password, user.password);
        if ( !isPWMatch ) {
            return res.status(401).json({ message: 'Incorrect password. Please try again.' })
        }
        if (!SECRET) {
            return res.status(500).json({ message: 'JWT secret is missing on server.' });
        }
        const token = jwt.sign(
            { id: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email, username: user.username }, SECRET
        );
        res.json({
            token,
            user:
            { id: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email, username: user.username }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to login user. Please try again.'})
    }
});

export default router;