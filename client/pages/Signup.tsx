import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Loader2, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'user' as 'user' | 'helper',
    dob: '',
    otp: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  
  const { signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/\d/.test(password)) strength += 15;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?]/.test(password)) strength += 15;
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?])/.test(password)) {
      strength += 10;
    }
    return Math.min(100, strength);
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 30) return { text: 'Weak', color: 'bg-red-500' };
    if (strength < 60) return { text: 'Fair', color: 'bg-yellow-500' };
    if (strength < 80) return { text: 'Good', color: 'bg-blue-500' };
    return { text: 'Strong', color: 'bg-green-500' };
  };

  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
      newErrors.username = 'Username must be 3-20 characters: letters, numbers, and underscore only';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (passwordStrength < 60) {
      newErrors.password = 'Password must meet the strength requirements';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 16) {
        newErrors.dob = 'You must be at least 16 years old to sign up';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      setCurrentStep(3);
      sendOTP();
    }
  };

  const sendOTP = async () => {
    setIsLoading(true);
    try {
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpSent(true);
      toast({
        title: "Verification Code Sent",
        description: `A 6-digit code has been sent to ${formData.email}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.otp || formData.otp.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit code' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role
      });
      
      toast({
        title: "Account Created Successfully!",
        description: "Welcome to DailyDone! Redirecting to your dashboard...",
      });
      
      // Navigate to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Signup error:', error);
      
      toast({
        title: "Signup Failed",
        description: error instanceof Error ? error.message : "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Update password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const renderStep1 = () => (
    <form onSubmit={handleStep1Submit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'border-red-500 bg-red-50' : ''}
          disabled={isLoading}
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          placeholder="Choose a unique username"
          value={formData.username}
          onChange={handleChange}
          className={errors.username ? 'border-red-500 bg-red-50' : ''}
          disabled={isLoading}
        />
        {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
        <p className="text-xs text-gray-500">3-20 characters, letters, numbers and underscore only</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'border-red-500 bg-red-50 pr-10' : 'pr-10'}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {formData.password && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${getPasswordStrengthText(passwordStrength).color}`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
              <span className="text-xs text-gray-600">
                {getPasswordStrengthText(passwordStrength).text}
              </span>
            </div>
          </div>
        )}
        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'border-red-500 bg-red-50 pr-10' : 'pr-10'}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
      </div>

      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
        Continue
      </Button>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleStep2Submit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'border-red-500 bg-red-50' : ''}
          disabled={isLoading}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          id="dob"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          className={errors.dob ? 'border-red-500 bg-red-50' : ''}
          disabled={isLoading}
        />
        {errors.dob && <p className="text-sm text-red-600">{errors.dob}</p>}
      </div>

      <div className="space-y-2">
        <Label>Account Type</Label>
        <Select value={formData.role} onValueChange={(value: 'user' | 'helper') => setFormData(prev => ({ ...prev, role: value }))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">🙋‍♂️ I need help with tasks</SelectItem>
            <SelectItem value="helper">🤝 I want to help others</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setCurrentStep(1)}
          className="flex-1"
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          Continue
        </Button>
      </div>
    </form>
  );

  const renderStep3 = () => (
    <form onSubmit={handleFinalSubmit} className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Verify Your Email</h3>
        <p className="text-gray-600">
          We've sent a 6-digit code to <strong>{formData.email}</strong>
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otp">Verification Code</Label>
        <Input
          id="otp"
          name="otp"
          placeholder="Enter 6-digit code"
          value={formData.otp}
          onChange={handleChange}
          className={errors.otp ? 'border-red-500 bg-red-50 text-center text-lg tracking-widest' : 'text-center text-lg tracking-widest'}
          disabled={isLoading}
          maxLength={6}
        />
        {errors.otp && <p className="text-sm text-red-600">{errors.otp}</p>}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={sendOTP}
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          disabled={isLoading}
        >
          Didn't receive the code? Resend OTP
        </button>
      </div>

      <div className="flex gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setCurrentStep(2)}
          className="flex-1"
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          {/* Progress Bar */}
          <div className="h-1 bg-gray-200 rounded-t-lg">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-lg transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center gap-4 p-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step === currentStep
                    ? 'bg-blue-600 text-white'
                    : step < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step < currentStep ? <Check size={16} /> : step}
              </div>
            ))}
          </div>

          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                🤝
              </div>
              <span className="text-2xl font-bold text-gray-900">DailyDone</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {currentStep === 1 && 'Create Your Account'}
              {currentStep === 2 && 'Personal Information'}
              {currentStep === 3 && 'Verify Email'}
            </CardTitle>
            <p className="text-gray-600">
              {currentStep === 1 && 'Enter your email and create a password'}
              {currentStep === 2 && 'Tell us a bit about yourself'}
              {currentStep === 3 && 'Enter the verification code we sent you'}
            </p>
          </CardHeader>
          
          <CardContent>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <Link to="/" className="text-white/80 hover:text-white text-sm">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
