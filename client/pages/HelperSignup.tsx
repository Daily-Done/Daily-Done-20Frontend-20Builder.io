import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

const HelperSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[\d\s\-\(\)]{10,20}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application Submitted! 🎉",
        description: "Thank you for signing up! We will review your application and get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: ''
      });
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                🤝
              </div>
              <span className="text-2xl font-bold text-gray-900">DailyDone</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#why-dailydone" className="text-gray-600 hover:text-blue-600 font-medium">Why DailyDone</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium">How it works</a>
              <a href="#requirements" className="text-gray-600 hover:text-blue-600 font-medium">Requirements</a>
              <a href="#faq" className="text-gray-600 hover:text-blue-600 font-medium">FAQ</a>
            </div>
            
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button>Become a Helper</Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-sky-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Earn flexibly, help your community
              </h1>
              <p className="text-xl opacity-90 leading-relaxed">
                Turn your free time into earnings by completing tasks for people in your neighborhood. Be your own boss, work when you want.
              </p>
              
              <div className="flex gap-12">
                <div>
                  <div className="text-3xl font-bold text-blue-200">Up to ₹800/day</div>
                  <div className="text-sm opacity-80">Potential earnings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-200">100+</div>
                  <div className="text-sm opacity-80">Task categories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-200">Fast</div>
                  <div className="text-sm opacity-80">Weekly payments</div>
                </div>
              </div>
            </div>
            
            {/* Signup Form */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900">Ready to start earning?</CardTitle>
                <p className="text-gray-600">Sign up today and start receiving task requests.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'border-red-500 bg-red-50' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'border-red-500 bg-red-50' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'border-red-500 bg-red-50' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? 'border-red-500 bg-red-50' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Sign up to be a Helper'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why DailyDone Section */}
      <section id="why-dailydone" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why become a DailyDone Helper?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enjoy freedom, flexibility, and the satisfaction of helping your community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💰',
                title: 'Earn Your Way',
                desc: 'Get paid for tasks you complete. Withdraw your earnings weekly. The more tasks you do, the more you earn.'
              },
              {
                icon: '⏰',
                title: 'Flexible Schedule',
                desc: 'You are in control. Choose the tasks that fit your schedule. Work in the morning, evening, or on weekends.'
              },
              {
                icon: '🤝',
                title: 'Be a Local Hero',
                desc: 'Make a real difference in your community by helping your neighbors with their daily needs.'
              }
            ].map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to get started</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Becoming a helper is quick and easy. Follow these simple steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Sign Up',
                desc: 'Create an account with your basic details. It only takes a few minutes.'
              },
              {
                step: '2',
                title: 'Complete Your Profile',
                desc: 'Upload your documents for a quick background verification. Your safety is our priority.'
              },
              {
                step: '3',
                title: 'Accept a Task',
                desc: 'Once verified, you\'ll start receiving task requests. Accept the ones you like.'
              },
              {
                step: '4',
                title: 'Get Paid',
                desc: 'Complete the task and get paid directly to your account. It\'s that simple.'
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section id="requirements" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Helper Requirements</h2>
            <p className="text-xl text-gray-600">
              To ensure quality and safety for our community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-green-600 flex items-center gap-2">
                  ✅ Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-800">✓</Badge>
                  <span>Must be 18+ years old</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-800">✓</Badge>
                  <span>Valid government ID</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-800">✓</Badge>
                  <span>Background verification</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-800">✓</Badge>
                  <span>Reliable smartphone</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-800">✓</Badge>
                  <span>Good communication skills</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  ⭐ Preferred
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-100 text-blue-800">⭐</Badge>
                  <span>Previous service experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-100 text-blue-800">⭐</Badge>
                  <span>Own vehicle for delivery tasks</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-100 text-blue-800">⭐</Badge>
                  <span>Local area knowledge</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-100 text-blue-800">⭐</Badge>
                  <span>Flexible schedule</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-100 text-blue-800">⭐</Badge>
                  <span>References available</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-sky-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Helping?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of helpers who are already earning while making their communities better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Sign Up as Helper
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Already a Helper? Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-6">Company</h3>
              <div className="space-y-3">
                <Link to="/" className="block text-gray-300 hover:text-white transition-colors">About DailyDone</Link>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">How it works</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Careers</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Press</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Blog</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-6">Products</h3>
              <div className="space-y-3">
                <Link to="/" className="block text-gray-300 hover:text-white transition-colors">For customers</Link>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">For helpers</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">DailyDone Business</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Gift cards</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-6">Support</h3>
              <div className="space-y-3">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Safety</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Contact us</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Trust & Safety</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Community guidelines</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-6">Global</h3>
              <div className="space-y-3">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Cities</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Countries</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Accessibility</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Diversity</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DailyDone Technologies Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelperSignup;
