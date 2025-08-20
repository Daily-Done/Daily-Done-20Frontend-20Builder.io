import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Clock, Star, DollarSign, User, Bell, LogOut, Settings, Menu } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  budget: number;
  location: string;
  createdAt: string;
  helper?: {
    name: string;
    rating: number;
  };
}

const Dashboard = () => {
  const [taskData, setTaskData] = useState({
    description: '',
    category: '',
    location: '',
    urgency: '',
    budget: 200
  });
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { user, logout, updateUser } = useAuth();
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Grocery shopping for elderly neighbor',
        description: 'Weekly grocery shopping for Mrs. Sharma. She\'s provided a detailed list.',
        status: 'completed',
        budget: 200,
        location: 'Andheri West',
        createdAt: '2024-01-15T10:00:00Z',
        helper: { name: 'Rajesh K.', rating: 4.8 }
      },
      {
        id: '2',
        title: 'Pet sitting for weekend',
        description: 'Take care of a friendly cat while owner is out of town.',
        status: 'in_progress',
        budget: 800,
        location: 'Bandra West',
        createdAt: '2024-01-14T15:30:00Z',
        helper: { name: 'Priya S.', rating: 4.9 }
      },
      {
        id: '3',
        title: 'Document submission at bank',
        description: 'Submit loan documents at HDFC Bank branch.',
        status: 'pending',
        budget: 150,
        location: 'Powai',
        createdAt: '2024-01-13T09:15:00Z'
      }
    ];
    setRecentTasks(mockTasks);
  }, []);

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskData.description || !taskData.category || !taskData.location || !taskData.urgency) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskData.description.substring(0, 50) + '...',
        description: taskData.description,
        status: 'pending',
        budget: taskData.budget,
        location: taskData.location,
        createdAt: new Date().toISOString()
      };

      setRecentTasks(prev => [newTask, ...prev]);
      
      toast({
        title: "Task Request Submitted!",
        description: "We're finding the best helpers in your area. You'll receive notifications as helpers express interest in your task.",
      });

      // Reset form
      setTaskData({
        description: '',
        category: '',
        location: '',
        urgency: '',
        budget: 200
      });

      // Update user stats
      if (user) {
        updateUser({
          completedTasks: (user.completedTasks || 0),
          moneySaved: (user.moneySaved || 0)
        });
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      pending: 'Pending',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                🤝
              </div>
              <span className="text-xl font-bold text-gray-900">DailyDone</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</a>
              <a href="#tasks" className="text-gray-600 hover:text-blue-600 font-medium">My Tasks</a>
              <a href="#help" className="text-gray-600 hover:text-blue-600 font-medium">Help</a>
              <a href="#settings" className="text-gray-600 hover:text-blue-600 font-medium">Profile</a>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3 text-sm">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{user?.rating || '5.0'}⭐</span>
                <span className="text-gray-600">{user?.name || 'User'}</span>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {(user?.name || 'U')[0].toUpperCase()}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="bg-gradient-to-br from-blue-600 to-sky-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold">
              Welcome back, <span className="text-blue-200">{user?.name || 'User'}!</span>
            </h1>
            <p className="text-xl opacity-90">
              {recentTasks.length === 0 
                ? 'Welcome to DailyDone! Ready for your first task?' 
                : `You have ${recentTasks.filter(t => t.status === 'pending').length} pending tasks. Ready for more?`
              }
            </p>
            
            <div className="flex justify-center gap-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">{user?.completedTasks || 0}</div>
                <div className="text-sm opacity-80">Tasks completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">{user?.rating || '5.0'}⭐</div>
                <div className="text-sm opacity-80">Your rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">₹{user?.moneySaved || 0}</div>
                <div className="text-sm opacity-80">Money saved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Request Task Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0 border-t-4 border-blue-600">
                <CardHeader>
                  <CardTitle className="text-2xl">Request a task</CardTitle>
                  <p className="text-gray-600">Tell us what you need help with</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleTaskSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        What do you need help with?
                      </label>
                      <Textarea
                        placeholder="e.g., Pick up groceries from Big Bazaar, walk my dog for 30 minutes..."
                        rows={3}
                        value={taskData.description}
                        onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                        className="resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                      </label>
                      <Select value={taskData.category} onValueChange={(value) => setTaskData({...taskData, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grocery">🛒 Grocery & Shopping</SelectItem>
                          <SelectItem value="delivery">📦 Pickup & Delivery</SelectItem>
                          <SelectItem value="pet-care">🐕 Pet Care</SelectItem>
                          <SelectItem value="household">🏠 Household Tasks</SelectItem>
                          <SelectItem value="personal">👥 Personal Assistance</SelectItem>
                          <SelectItem value="transport">🚗 Transportation</SelectItem>
                          <SelectItem value="other">📝 Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your location
                      </label>
                      <Input
                        placeholder="Enter your area or full address"
                        value={taskData.location}
                        onChange={(e) => setTaskData({...taskData, location: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        When do you need this done?
                      </label>
                      <Select value={taskData.urgency} onValueChange={(value) => setTaskData({...taskData, urgency: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">🔥 ASAP (within 2 hours)</SelectItem>
                          <SelectItem value="today">⏰ Today</SelectItem>
                          <SelectItem value="tomorrow">📅 Tomorrow</SelectItem>
                          <SelectItem value="this-week">📅 This week</SelectItem>
                          <SelectItem value="flexible">🕐 I'm flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Budget
                      </label>
                      <div className="bg-blue-50 p-5 rounded-lg">
                        <Slider
                          value={[taskData.budget]}
                          onValueChange={([value]) => setTaskData({...taskData, budget: value})}
                          max={1000}
                          min={50}
                          step={25}
                          className="mb-4"
                        />
                        <div className="text-center">
                          <span className="text-2xl font-bold text-blue-600">₹{taskData.budget}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Finding helpers...' : 'Find available helpers'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <div>
              <Card className="shadow-lg border-0">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">Recent Activities</CardTitle>
                  <Link to="/tasks" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View all →
                  </Link>
                </CardHeader>
                <CardContent>
                  {recentTasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-4">📝</div>
                      <h3 className="font-semibold mb-2">No recent activities</h3>
                      <p className="text-sm">Your task history will appear here once you start using DailyDone</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentTasks.slice(0, 3).map((task) => (
                        <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-sm">{task.title}</h4>
                            {getStatusBadge(task.status)}
                          </div>
                          <p className="text-gray-600 text-xs mb-3 line-clamp-2">{task.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {task.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              ₹{task.budget}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDate(task.createdAt)}
                            </div>
                          </div>
                          {task.helper && (
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              <div className="flex items-center gap-2 text-xs">
                                <User className="w-3 h-3" />
                                <span>{task.helper.name}</span>
                                <Star className="w-3 h-3 text-yellow-500" />
                                <span>{task.helper.rating}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
