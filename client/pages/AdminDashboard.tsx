import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../contexts/AuthContext";
import {
  Users,
  Clock,
  Star,
  DollarSign,
  User,
  LogOut,
  Menu,
  Settings,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Shield,
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  totalHelpers: number;
  activeTasks: number;
  completedTasks: number;
  totalRevenue: number;
  averageRating: number;
}

interface RecentActivity {
  id: string;
  type:
    | "user_signup"
    | "helper_signup"
    | "task_completed"
    | "task_cancelled"
    | "payment_processed";
  description: string;
  timestamp: string;
  amount?: number;
}

interface PendingApproval {
  id: string;
  type: "helper_verification" | "dispute_resolution" | "task_review";
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  timestamp: string;
}

const AdminDashboard = () => {
  const [adminStats, setAdminStats] = useState<AdminStats>({
    totalUsers: 1247,
    totalHelpers: 384,
    activeTasks: 156,
    completedTasks: 2841,
    totalRevenue: 284750,
    averageRating: 4.7,
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>(
    [],
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    const mockActivity: RecentActivity[] = [
      {
        id: "1",
        type: "task_completed",
        description: "Grocery delivery task completed by Rajesh K.",
        timestamp: "2 minutes ago",
        amount: 150,
      },
      {
        id: "2",
        type: "helper_signup",
        description: "New helper signed up: Priya S. (pending verification)",
        timestamp: "15 minutes ago",
      },
      {
        id: "3",
        type: "payment_processed",
        description: "Payment of ₹250 processed for task #2841",
        timestamp: "1 hour ago",
        amount: 250,
      },
      {
        id: "4",
        type: "user_signup",
        description: "New user registered: John D.",
        timestamp: "2 hours ago",
      },
      {
        id: "5",
        type: "task_cancelled",
        description: "Task #2839 cancelled due to helper unavailability",
        timestamp: "3 hours ago",
      },
    ];

    const mockPendingApprovals: PendingApproval[] = [
      {
        id: "1",
        type: "helper_verification",
        title: "Helper Verification Required",
        description: "Review documents for Amit K. - Pet care specialist",
        priority: "high",
        timestamp: "30 minutes ago",
      },
      {
        id: "2",
        type: "dispute_resolution",
        title: "Task Dispute Resolution",
        description: "User complaint about incomplete grocery delivery",
        priority: "medium",
        timestamp: "2 hours ago",
      },
      {
        id: "3",
        type: "task_review",
        title: "Suspicious Task Activity",
        description: "Unusual pricing pattern detected for user ID #1234",
        priority: "low",
        timestamp: "4 hours ago",
      },
    ];

    setRecentActivity(mockActivity);
    setPendingApprovals(mockPendingApprovals);
  }, []);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleApproval = (id: string, action: "approve" | "reject") => {
    setPendingApprovals((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: action === "approve" ? "Approved" : "Rejected",
      description: `Request has been ${action}ed successfully.`,
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_signup":
        return <User className="w-4 h-4 text-blue-600" />;
      case "helper_signup":
        return <Users className="w-4 h-4 text-green-600" />;
      case "task_completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "task_cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "payment_processed":
        return <DollarSign className="w-4 h-4 text-purple-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-green-100 text-green-800 border-green-200",
    };

    return (
      <Badge className={variants[priority as keyof typeof variants]}>
        {priority.toUpperCase()}
      </Badge>
    );
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
              <span className="text-xl font-bold text-gray-900">
                DailyDone Admin
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a
                href="#dashboard"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Dashboard
              </a>
              <a
                href="#users"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Users
              </a>
              <a
                href="#helpers"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Helpers
              </a>
              <a
                href="#tasks"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Tasks
              </a>
              <a
                href="#analytics"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Analytics
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-purple-600" />
                <span className="font-medium">Admin</span>
                <span className="text-gray-600">
                  {user?.name || "Administrator"}
                </span>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {(user?.name || "A")[0].toUpperCase()}
                </div>
              </div>
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
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
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-xl opacity-90">
              Monitor platform activity, manage users, and ensure quality
              service
            </p>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-200">
                  {adminStats.totalUsers}
                </div>
                <div className="text-sm opacity-80">Total Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-200">
                  {adminStats.totalHelpers}
                </div>
                <div className="text-sm opacity-80">Active Helpers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-200">
                  {adminStats.activeTasks}
                </div>
                <div className="text-sm opacity-80">Active Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-200">
                  {adminStats.completedTasks}
                </div>
                <div className="text-sm opacity-80">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-200">
                  ₹{(adminStats.totalRevenue / 1000).toFixed(0)}K
                </div>
                <div className="text-sm opacity-80">Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-200">
                  {adminStats.averageRating}⭐
                </div>
                <div className="text-sm opacity-80">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Pending Approvals */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    Pending Approvals
                  </CardTitle>
                  <Badge className="bg-orange-100 text-orange-800">
                    {pendingApprovals.length} pending
                  </Badge>
                </CardHeader>
                <CardContent>
                  {pendingApprovals.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                      <h3 className="font-semibold mb-2">All caught up!</h3>
                      <p className="text-sm">
                        No pending approvals at the moment.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingApprovals.map((item) => (
                        <div
                          key={item.id}
                          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-sm">
                              {item.title}
                            </h4>
                            {getPriorityBadge(item.priority)}
                          </div>
                          <p className="text-gray-600 text-xs mb-3">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {item.timestamp}
                            </span>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleApproval(item.id, "reject")
                                }
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleApproval(item.id, "approve")
                                }
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="mt-1">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 leading-tight">
                            {activity.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {activity.timestamp}
                            </span>
                            {activity.amount && (
                              <Badge className="text-xs bg-green-100 text-green-800">
                                ₹{activity.amount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-6">
                Admin Tools
              </h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  User Management
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Helper Verification
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Task Monitoring
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Payment Oversight
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Analytics Dashboard
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-6">Platform</h3>
              <div className="space-y-3">
                <Link
                  to="/"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Public Site
                </Link>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  API Documentation
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  System Status
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Security Center
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-6">Support</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Admin Help Center
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Report Issue
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Emergency Contacts
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-6">Legal</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Admin Policies
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Compliance
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 DailyDone Technologies Inc. All rights reserved. |
              Admin Portal v2.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
