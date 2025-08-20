import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
            🤝
          </div>
          <span className="text-3xl font-bold">DailyDone</span>
        </div>

        {/* 404 Animation */}
        <div className="text-8xl font-bold mb-8 text-white/80">
          4<span className="inline-block animate-bounce">0</span>4
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-white/90 mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have wandered off. Let's
          get you back to helping your community.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Search className="w-5 h-5" />
            <h3 className="font-semibold">Looking for something specific?</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <Link
              to="/dashboard"
              className="hover:text-blue-200 transition-colors"
            >
              → User Dashboard
            </Link>
            <Link
              to="/helper-dashboard"
              className="hover:text-blue-200 transition-colors"
            >
              → Helper Dashboard
            </Link>
            <Link to="/login" className="hover:text-blue-200 transition-colors">
              → Sign In
            </Link>
            <Link
              to="/signup"
              className="hover:text-blue-200 transition-colors"
            >
              → Sign Up
            </Link>
          </div>
        </div>

        {/* Fun fact */}
        <p className="mt-8 text-sm text-white/70">
          💡 Fun fact: While you're here, thousands of neighbors are helping
          each other through DailyDone!
        </p>
      </div>
    </div>
  );
};

export default NotFound;
