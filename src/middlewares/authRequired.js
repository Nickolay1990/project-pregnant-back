import jwt from 'jsonwebtoken';
export function authRequired(req, res, next) {
  if (req.user?.id || req.user?._id) return next();

  const auth = req.headers.authorization || '';
  const [type, token] = auth.split(' ');
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: 'JWT secret is not configured' });
  }

  try {
    const payload = jwt.verify(token, secret);
    const id = payload?.sub || payload?.id || payload?._id;
    if (!id) return res.status(401).json({ message: 'Invalid token payload' });
    req.user = { id };
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
