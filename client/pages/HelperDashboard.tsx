import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { 
  MapPin, 
  Clock, 
  Star, 
  DollarSign, 
  User, 
  LogOut, 
  Menu,
  CheckCircle,
  MessageCircle,
  Filter,
  TrendingUp
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: 'urgent' | 'today' | 'flexible';
  location: string;
  distance: string;
  budget: number;
  timePosted: string;
  requester: string;
}

interface MyTask {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: 'accepted' | 'completed' | 'cancelled';
  requester: string;
  location: string;
  acceptedTime: string;
}

const HelperDashboard = () => {
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [myTasks, setMyTasks] = useState<MyTask[]>([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [taskFilter, setTaskFilter] = useState('all');
  const [myTasksFilter, setMyTasksFilter] = useState('active');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { user, logout, updateUser } = useAuth();
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    const mockAvailableTasks: Task[] = [
      {
        id: '1',
        title: 'Pick up groceries from local market',
        description: 'Need someone to buy vegetables and fruits from the nearby market. I\'ll provide the exact list and money.',
        category: 'grocery',
        urgency: 'today',
        location: 'Andheri West, Mumbai',
        distance: '0.8 km',
        budget: 150,
        timePosted: '2 hours ago',
        requester: 'Priya S.'
      },
      {
        id: '2',
        title: 'Collect medicine from pharmacy',
        description: 'My elderly father needs his regular medicines. The prescription is ready at Apollo Pharmacy.',
        category: 'delivery',
        urgency: 'urgent',
        location: 'Bandra East, Mumbai',
        distance: '1.2 km',
        budget: 100,
        timePosted: '30 minutes ago',
        requester: 'Rajesh K.'
      },
      {
        id: '3',
        title: 'Dog walking service needed',
        description: 'My Golden Retriever needs a 30-minute walk in the evening. Very friendly and well-trained dog.',
        category: 'pet-care',
        urgency: 'flexible',
        location: 'Powai, Mumbai',
        distance: '2.1 km',
        budget: 200,
        timePosted: '1 hour ago',
        requester: 'Anjali M.'
      },
      {
        id: '4',
        title: 'Package delivery to office',
        description: 'Need to send important documents to my office in BKC. Small envelope, very important.',
        category: 'delivery',
        urgency: 'urgent',
        location: 'Kurla West, Mumbai',
        distance: '3.0 km',
        budget: 250,
        timePosted: '45 minutes ago',
        requester: 'Vikram T.'
      }
    ];

    const mockMyTasks: MyTask[] = [
      {
        id: '101',
        title: 'Grocery shopping for elderly neighbor',
        description: 'Weekly grocery shopping for Mrs. Sharma. She\'s provided a detailed list.',
        budget: 200,
        status: 'accepted',
        requester: 'Mrs. Sharma',
        location: 'Andheri West',
        acceptedTime: '2 hours ago'
      },
      {
        id: '102',
        title: 'Pet sitting for weekend',
        description: 'Take care of a friendly cat while owner is out of town.',
        budget: 800,
        status: 'completed',
        requester: 'Arjun K.',
        location: 'Bandra West',
        acceptedTime: '2 days ago'
      }
    ];

    setAvailableTasks(mockAvailableTasks);
    setMyTasks(mockMyTasks);
  }, []);

  const acceptTask = (taskId: string) => {
    const task = availableTasks.find(t => t.id === taskId);
    if (task) {
      const confirmAccept = window.confirm(
        `Accept this task?\n\n"${task.title}"\n\nBudget: ₹${task.budget}\nLocation: ${task.location}`
      );
      
      if (confirmAccept) {
        // Remove from available tasks
        setAvailableTasks(prev => prev.filter(t => t.id !== taskId));
        
        // Add to my tasks
        const newMyTask: MyTask = {
          id: taskId,
          title: task.title,
          description: task.description,
          budget: task.budget,
          status: 'accepted',
          requester: task.requester,
          location: task.location,
          acceptedTime: 'Just now'
        };
        setMyTasks(prev => [newMyTask, ...prev]);
        
        toast({
          title: "Task Accepted! 🎉",
          description: "You can now contact the requester. Great job!",
        });

        // Update user stats
        if (user) {
          updateUser({
            completedTasks: (user.completedTasks || 0),
          });
        }
      }
    }
  };

  const markComplete = (taskId: string) => {
    const task = myTasks.find(t => t.id === taskId);
    if (task) {
      const confirmComplete = window.confirm(`Mark "${task.title}" as completed?`);
      
      if (confirmComplete) {
        setMyTasks(prev =>
          prev.map(t =>
            t.id === taskId
              ? { ...t, status: 'completed', acceptedTime: 'Just completed' }
              : t
          )
        );
        
        toast({
          title: "Task Completed! ✅",
          description: "Payment will be processed. Well done!",
        });

        // Update user stats
        if (user) {
          updateUser({
            completedTasks: (user.completedTasks || 0) + 1,
          });
        }
      }
    }
  };

  const contactRequester = (taskId: string) => {
    const task = myTasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: "Opening Chat",
        description: `Starting conversation with ${task.requester}...`,
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleAvailabilityToggle = (checked: boolean) => {
    setIsAvailable(checked);
    toast({
      title: checked ? "You're Now Available! ✅" : "You're Now Offline ⏸️",
      description: checked 
        ? "You'll receive new task notifications" 
        : "You won't receive task notifications",
    });
  };

  const getUrgencyBadge = (urgency: string) => {
    const variants = {
      urgent: 'bg-red-100 text-red-800',
      today: 'bg-orange-100 text-orange-800',
      flexible: 'bg-blue-100 text-blue-800'
    };
    
    const labels = {
      urgent: '🔥 URGENT',
      today: '⏰ TODAY',
      flexible: '📅 FLEXIBLE'
    };

    return (
      <Badge className={variants[urgency as keyof typeof variants]}>
        {labels[urgency as keyof typeof labels]}
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      grocery: '🛒',
      delivery: '📦',
      'pet-care': '🐕',
      household: '🏠',
      personal: '👥',
      transport: '🚗'
    };
    return icons[category as keyof typeof icons] || '📝';
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      accepted: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      accepted: '🟡 IN PROGRESS',
      completed: '✅ COMPLETED',
      cancelled: '❌ CANCELLED'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const filteredAvailableTasks = availableTasks.filter(task => {
    if (taskFilter === 'all') return true;
    if (taskFilter === 'urgent') return task.urgency === 'urgent';
    if (taskFilter === 'today') return task.urgency === 'today';
    if (taskFilter === 'high-pay') return task.budget >= 250;
    return true;
  });

  const filteredMyTasks = myTasks.filter(task => {
    if (myTasksFilter === 'active') return task.status === 'accepted';
    return task.status === myTasksFilter;
  });

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
              <a href="#available-tasks" className="text-gray-600 hover:text-blue-600 font-medium">Available Tasks</a>
              <a href="#my-tasks" className="text-gray-600 hover:text-blue-600 font-medium">My Tasks</a>
              <a href="#earnings" className="text-gray-600 hover:text-blue-600 font-medium">Earnings</a>
              <a href="#profile" className="text-gray-600 hover:text-blue-600 font-medium">Profile</a>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3 text-sm">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{user?.rating || '5.0'}⭐</span>
                <span className="text-gray-600">{user?.name || 'Helper'}</span>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {(user?.name || 'H')[0].toUpperCase()}
                </div>
              </div>
              <Link to="/dashboard">
                <Button variant="outline" size="sm">Switch to User</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Profile
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
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">
                Ready to <span className="text-blue-200">Help Neighbors</span>?
              </h1>
              <p className="text-xl opacity-90">
                Browse available tasks in your area and start earning while building community connections.
              </p>
              
              <div className="flex gap-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-200">{user?.completedTasks || 0}</div>
                  <div className="text-sm opacity-80">Tasks Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-200">₹{(user?.completedTasks || 0) * 180}</div>
                  <div className="text-sm opacity-80">Earned This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-200">{user?.rating || '5.0'}⭐</div>
                  <div className="text-sm opacity-80">Your Rating</div>
                </div>
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <Switch
                  checked={isAvailable}
                  onCheckedChange={handleAvailabilityToggle}
                  className="data-[state=checked]:bg-green-500"
                />
                <div>
                  <h3 className="font-semibold text-lg">
                    {isAvailable ? 'Available to Help' : 'Not Available'}
                  </h3>
                  <p className="text-sm opacity-80">
                    {isAvailable 
                      ? "You'll receive new task notifications" 
                      : "You won't receive task notifications"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Tasks */}
      <section id="available-tasks" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Available Tasks Near You</h2>
            <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm border">
              {['all', 'urgent', 'today', 'high-pay'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTaskFilter(filter)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    taskFilter === filter
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {filter === 'all' && 'All Tasks'}
                  {filter === 'urgent' && 'Urgent'}
                  {filter === 'today' && 'Today'}
                  {filter === 'high-pay' && 'High Pay'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAvailableTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md relative">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-orange-100 text-orange-800 text-xs">
                    {task.distance}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
                      {getCategoryIcon(task.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          {task.category.replace('-', ' ')}
                        </Badge>
                      </div>
                      {getUrgencyBadge(task.urgency)}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-3 leading-tight">{task.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {task.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {task.requester}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.timePosted}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-2xl font-bold text-blue-600">₹{task.budget}</div>
                    <Button 
                      onClick={() => acceptTask(task.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept Task
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAvailableTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No tasks available</h3>
              <p className="text-gray-600">Check back soon for new opportunities to help neighbors!</p>
            </div>
          )}
        </div>
      </section>

      {/* My Tasks */}
      <section id="my-tasks" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">My Accepted Tasks</h2>
            <p className="text-gray-600 mb-6">Track your ongoing and completed tasks</p>
            
            <div className="flex justify-center gap-2 bg-gray-100 rounded-lg p-1 w-fit mx-auto">
              {['active', 'completed', 'cancelled'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setMyTasksFilter(filter)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    myTasksFilter === filter
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMyTasks.map((task) => (
              <Card key={task.id} className="border-0 shadow-md relative">
                <div className="absolute top-4 right-4">
                  {getStatusBadge(task.status)}
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3 leading-tight pr-20">{task.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.description}</p>
                  
                  <div className="space-y-2 mb-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {task.requester}
                    </div>
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
                      {task.acceptedTime}
                    </div>
                  </div>
                  
                  {task.status === 'accepted' && (
                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <Button 
                        onClick={() => markComplete(task.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Complete
                      </Button>
                      <Button 
                        onClick={() => contactRequester(task.id)}
                        variant="outline"
                        className="flex-1"
                        size="sm"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMyTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">No {myTasksFilter} tasks</h3>
              <p className="text-gray-600">
                {myTasksFilter === 'active' 
                  ? 'Accept some tasks to get started!' 
                  : `You don't have any ${myTasksFilter} tasks yet.`
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HelperDashboard;
