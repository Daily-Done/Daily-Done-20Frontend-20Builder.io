import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: 'user' | 'helper';
  rating?: number;
  completedTasks?: number;
  moneySaved?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
  name: string;
  role?: 'user' | 'helper';
}

// Demo users for frontend-only mode
const DEMO_USERS = [
  {
    id: '1',
    username: 'demo',
    email: 'demo@dailydone.com',
    name: 'Demo User',
    role: 'user' as const,
    password: 'Demo123!',
    rating: 4.8,
    completedTasks: 15,
    moneySaved: 2340,
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user' as const,
    password: 'Password123!',
    rating: 5.0,
    completedTasks: 8,
    moneySaved: 1200,
  },
  {
    id: '3',
    username: 'admin',
    email: 'admin@dailydone.com',
    name: 'Admin Helper',
    role: 'helper' as const,
    password: 'Admin123!',
    rating: 4.9,
    completedTasks: 42,
    moneySaved: 0,
  }
];

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!token && !!user;

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('user_data');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear invalid data
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Demo login function (frontend-only)
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find demo user
      const demoUser = DEMO_USERS.find(u => u.email === email && u.password === password);
      
      if (!demoUser) {
        throw new Error('Invalid email or password');
      }

      // Generate demo token
      const demoToken = `demo_token_${demoUser.id}_${Date.now()}`;
      
      // Remove password from user object
      const { password: _, ...userWithoutPassword } = demoUser;
      
      setToken(demoToken);
      setUser(userWithoutPassword);
      
      // Store in localStorage
      localStorage.setItem('auth_token', demoToken);
      localStorage.setItem('user_data', JSON.stringify(userWithoutPassword));
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Demo signup function (frontend-only)
  const signup = async (userData: SignupData): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if email already exists
      if (DEMO_USERS.find(u => u.email === userData.email)) {
        throw new Error('Email already registered');
      }
      
      // Check if username already exists
      if (DEMO_USERS.find(u => u.username === userData.username)) {
        throw new Error('Username already taken');
      }

      // Create new user
      const newUser: User = {
        id: (DEMO_USERS.length + 1).toString(),
        username: userData.username,
        email: userData.email,
        name: userData.name,
        role: userData.role || 'user',
        rating: 5.0,
        completedTasks: 0,
        moneySaved: 0,
      };

      // Generate demo token
      const demoToken = `demo_token_${newUser.id}_${Date.now()}`;
      
      setToken(demoToken);
      setUser(newUser);
      
      // Store in localStorage
      localStorage.setItem('auth_token', demoToken);
      localStorage.setItem('user_data', JSON.stringify(newUser));
      
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    
    // Clear localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  };

  // Update user data
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Demo API helper function (frontend-only)
export const apiCall = async (
  endpoint: string, 
  options: RequestInit = {}
): Promise<any> => {
  // Simulate API calls with demo data
  console.log(`Demo API call: ${endpoint}`, options);
  
  // Return mock success response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Demo API response' });
    }, 500);
  });
};
