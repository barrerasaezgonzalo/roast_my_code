"use client";
import { useState } from "react";
import { Flame, Menu, X, Zap } from "lucide-react";
import Link from "next/link";
import AuthModal from "../landing/AuthModal";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");

  // TODO: Reemplazar con hook useAuth real cuando implementemos Supabase
  const isLoggedIn = false;

  const handleAuthClick = (mode: "signup" | "login") => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-lg border-b border-red-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Flame className="w-8 h-8 text-red-500 group-hover:animate-flame transition-transform" />
                <Zap className="w-3 h-3 text-purple-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-xl font-bold">
                Roast<span className="text-red-500">My</span>Code
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/leaderboard"
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Leaderboard
              </Link>
              <Link
                href="/roast"
                className="text-gray-300 hover:text-white transition-colors font-medium flex items-center gap-1"
              >
                <Zap className="w-4 h-4 text-purple-400" />
                Try AI
              </Link>

              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    Dashboard
                  </Link>
                  <button className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500" />
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthClick("login")}
                    className="text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick("signup")}
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 px-5 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/20"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 animate-slideDown">
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/roast"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors font-medium py-2 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-purple-400" />
                Try AI
              </Link>
              <Link
                href="/leaderboard"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
              >
                Leaderboard
              </Link>

              <div className="pt-4 border-t border-gray-800 space-y-3">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
                    >
                      Dashboard
                    </Link>
                    <button className="w-full text-left text-gray-300 hover:text-white transition-colors font-medium py-2">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleAuthClick("login")}
                      className="block w-full text-left text-gray-300 hover:text-white transition-colors font-medium py-2"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleAuthClick("signup")}
                      className="block w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 px-5 py-3 rounded-lg font-semibold transition-all duration-300 text-center"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
