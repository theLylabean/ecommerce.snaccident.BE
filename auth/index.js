import express from 'express';
import loginRouter from './login.js';
import registerRouter from './register.js';
import accountRouter from './me.js';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/account', accountRouter);

export default router;