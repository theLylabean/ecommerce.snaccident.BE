import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecretkey';

export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Missing token.' });
  if (!authHeader) return res.status(401).json({ error: 'Authorization header required.' });

  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}