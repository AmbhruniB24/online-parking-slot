// [Experiment 6] Implement authentication and user roles with JWT
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isDBConnected } = require('../config/db');
const { memoryUsers } = require('../config/store');

// Verify Bearer JWT Token
const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'smartpark_super_secret_jwt_key_2026');

      let user = null;
      if (isDBConnected()) {
        try {
          user = await User.findById(decoded.id).select('-password');
        } catch (dbErr) {
          console.warn('[Auth Middleware] DB lookup warning:', dbErr.message);
        }
      }

      if (!user) {
        user = memoryUsers.find(u => String(u._id) === String(decoded.id) || u.email === decoded.email);
      }

      // If user object not found in store, reconstruct safely from verified JWT payload
      if (!user && decoded.id) {
        user = {
          _id: decoded.id,
          id: decoded.id,
          name: decoded.name || 'User',
          email: decoded.email,
          role: decoded.role || 'driver'
        };
      }

      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found with this token' });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized, token invalid or expired' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

// Role-Based Access Control (RBAC)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user ? req.user.role : 'Guest'}) is not permitted to access this resource`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
