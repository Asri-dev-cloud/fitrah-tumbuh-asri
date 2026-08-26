export const ADMIN_TOKEN = 'ft-admin-super-token-2026';

export const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === `Bearer ${ADMIN_TOKEN}`) {
    next();
  } else {
    res.status(401).json({ message: 'Akses ditolak. Token tidak valid.' });
  }
};
