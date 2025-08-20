import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Types
interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: 'user' | 'helper';
  password: string;
  rating?: number;
  completedTasks?: number;
  moneySaved?: number;
  createdAt: string;
}

interface JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'helper';
}

// Mock database - In production, use a real database
const users: User[] = [
  {
    id: '1',
    username: 'demo',
    email: 'demo@dailydone.com',
    name: 'Demo User',
    role: 'user',
    password: '$2a$10$8K1p/a0dqNNH.D9cH4z3.uLZl.wBKoELIWdVtKR1YnqUf8UgUjI7y', // Demo123!
    rating: 4.8,
    completedTasks: 15,
    moneySaved: 2340,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user',
    password: '$2a$10$X5/wRTjT5Fqm7h6n5E9O2uBKl.wBKoELIWdVtKR1YnqUf8UgUjI7y', // Password123!
    rating: 5.0,
    completedTasks: 8,
    moneySaved: 1200,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    username: 'admin',
    email: 'admin@dailydone.com',
    name: 'Admin Helper',
    role: 'helper',
    password: '$2a$10$Y6/wRTjT5Fqm7h6n5E9O2uCKl.wBKoELIWdVtKR1YnqUf8UgUjI7y', // Admin123!
    rating: 4.9,
    completedTasks: 42,
    moneySaved: 0,
    createdAt: new Date().toISOString()
  }
];

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Utility functions
const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
};

const sanitizeUser = (user: User) => {
  const { password, ...sanitized } = user;
  return sanitized;
};

const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

const findUserByUsername = (username: string): User | undefined => {
  return users.find(user => user.username.toLowerCase() === username.toLowerCase());
};

const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Auth middleware
export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }

  req.user = payload;
  next();
};

// Login handler
export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    // Return success response
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: sanitizeUser(user),
      redirect_url: user.role === 'helper' ? '/helper-dashboard' : '/dashboard'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Register handler
export const handleRegister: RequestHandler = async (req, res) => {
  try {
    const { username, email, password, name, role = 'user' } = req.body;

    // Validation
    if (!username || !email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Username validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        success: false,
        message: 'Username must be 3-20 characters: letters, numbers, and underscore only'
      });
    }

    // Password strength validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    if (findUserByUsername(username)) {
      return res.status(409).json({
        success: false,
        message: 'Username already taken'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser: User = {
      id: (users.length + 1).toString(),
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      name,
      role: role as 'user' | 'helper',
      password: hashedPassword,
      rating: 5.0,
      completedTasks: 0,
      moneySaved: 0,
      createdAt: new Date().toISOString()
    };

    // Add to mock database
    users.push(newUser);

    // Generate token
    const token = generateToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: sanitizeUser(newUser),
      redirect_url: newUser.role === 'helper' ? '/helper-dashboard' : '/dashboard'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Verify token handler
export const handleVerifyToken: RequestHandler = (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Get current user data
    const user = findUserById(payload.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: sanitizeUser(user),
      valid: true
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Logout handler
export const handleLogout: RequestHandler = (req, res) => {
  try {
    // In a real application, you might want to:
    // 1. Add the token to a blacklist
    // 2. Clear any server-side sessions
    // 3. Log the logout event
    
    res.json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}
