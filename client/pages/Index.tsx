import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [taskData, setTaskData] = useState({
    description: "",
    category: "",
    location: "",
    urgency: "",
    budget: 200,
  });
  const { toast } = useToast();

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !taskData.description ||
      !taskData.category ||
      !taskData.location ||
      !taskData.urgency
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Show success message
    toast({
      title: "Task Request Submitted!",
      description:
        "We're finding the best helpers in your area. You'll receive notifications as helpers express interest in your task.",
    });

    // Reset form
    setTaskData({
      description: "",
      category: "",
      location: "",
      urgency: "",
      budget: 200,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                🤝
              </div>
              <span className="text-2xl font-bold text-gray-900">
                DailyDone
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#services"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Services
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                How it works
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                About
              </a>
              <a
                href="#help"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Help
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-sky-500 text-white py-20 overflow-hidden">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>\')] opacity-30'
          }
        ></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Get things done with trusted neighbors
              </h1>
              <p className="text-xl opacity-90 leading-relaxed">
                From grocery runs to pet care, connect with verified helpers in
                your neighborhood for any task, anytime.
              </p>

              <div className="flex gap-12">
                <div>
                  <div className="text-3xl font-bold text-blue-200">50K+</div>
                  <div className="text-sm opacity-80">Active helpers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-200">98%</div>
                  <div className="text-sm opacity-80">Task completion</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-200">4.9★</div>
                  <div className="text-sm opacity-80">Average rating</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  ✓ Background verified
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  ✓ Secure payments
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  ✓ Real-time tracking
                </Badge>
              </div>
            </div>

            {/* Request Task Form */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardHeader className="text-center border-t-4 border-blue-600 rounded-t-lg">
                <CardTitle className="text-2xl text-gray-900">
                  Request a task
                </CardTitle>
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
                      onChange={(e) =>
                        setTaskData({
                          ...taskData,
                          description: e.target.value,
                        })
                      }
                      className="resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <Select
                      value={taskData.category}
                      onValueChange={(value) =>
                        setTaskData({ ...taskData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grocery">
                          🛒 Grocery & Shopping
                        </SelectItem>
                        <SelectItem value="delivery">
                          📦 Pickup & Delivery
                        </SelectItem>
                        <SelectItem value="pet-care">🐕 Pet Care</SelectItem>
                        <SelectItem value="household">
                          🏠 Household Tasks
                        </SelectItem>
                        <SelectItem value="personal">
                          👥 Personal Assistance
                        </SelectItem>
                        <SelectItem value="transport">
                          🚗 Transportation
                        </SelectItem>
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
                      onChange={(e) =>
                        setTaskData({ ...taskData, location: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      When do you need this done?
                    </label>
                    <Select
                      value={taskData.urgency}
                      onValueChange={(value) =>
                        setTaskData({ ...taskData, urgency: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">
                          🔥 ASAP (within 2 hours)
                        </SelectItem>
                        <SelectItem value="today">⏰ Today</SelectItem>
                        <SelectItem value="tomorrow">📅 Tomorrow</SelectItem>
                        <SelectItem value="this-week">📅 This week</SelectItem>
                        <SelectItem value="flexible">
                          🕐 I'm flexible
                        </SelectItem>
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
                        onValueChange={([value]) =>
                          setTaskData({ ...taskData, budget: value })
                        }
                        max={1000}
                        min={50}
                        step={25}
                        className="mb-4"
                      />
                      <div className="text-center">
                        <span className="text-2xl font-bold text-blue-600">
                          ₹{taskData.budget}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg py-6"
                  >
                    Find available helpers
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From everyday errands to special requests, our community helpers
              are ready to assist
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🛒",
                title: "Grocery & Shopping",
                desc: "Get fresh groceries, medicines, and daily essentials delivered by trusted neighbors from your favorite stores.",
              },
              {
                icon: "📦",
                title: "Pickup & Delivery",
                desc: "Package collection, document submission, courier services, and local deliveries handled with care.",
              },
              {
                icon: "🐕",
                title: "Pet Care",
                desc: "Dog walking, pet sitting, vet visits, and pet care services by verified animal lovers in your area.",
              },
              {
                icon: "🏠",
                title: "Household Tasks",
                desc: "Small repairs, cleaning assistance, furniture assembly, and home organization by skilled helpers.",
              },
              {
                icon: "👥",
                title: "Personal Assistance",
                desc: "Queue waiting, appointment bookings, bank visits, and other personal errands done efficiently.",
              },
              {
                icon: "🚗",
                title: "Transportation",
                desc: "Local rides, airport transfers, moving assistance, and transportation help when you need it most.",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.desc}
                  </p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How DailyDone works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting help from neighbors is simple, safe, and reliable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Tell us what you need",
                desc: "Describe your task, set your budget, and choose when you need it done. Our smart system will match you with the right helpers.",
              },
              {
                step: "2",
                title: "Get matched instantly",
                desc: "Receive offers from verified helpers nearby within minutes. View their profiles, ratings, and choose who you prefer.",
              },
              {
                step: "3",
                title: "Track and communicate",
                desc: "Stay connected with your helper through our secure chat. Get real-time updates and photos of task progress.",
              },
              {
                step: "4",
                title: "Pay and review",
                desc: "Pay securely through the app when your task is complete. Rate your experience to help build our trusted community.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
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
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  About DailyDone
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  How it works
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Careers
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Press
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-6">Products</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  For customers
                </a>
                <Link
                  to="/helper-signup"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  For helpers
                </Link>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  DailyDone Business
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Gift cards
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
                  Help Center
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Safety
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Contact us
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Trust & Safety
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Community guidelines
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-6">Global</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Cities
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Countries
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Accessibility
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Diversity
                </a>
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

export default Index;
