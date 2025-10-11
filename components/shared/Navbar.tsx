"use client";
import { useState, useEffect } from "react";
import { Flame, Menu, X, Zap, LogOut, User } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import AuthModal from "../landing/AuthModal";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    // Obtener usuario actual
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Escuchar cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleAuthClick = (mode: "signup" | "login") => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  // Obtener iniciales del usuario
  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
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

              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse" />
              ) : user ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    Dashboard
                  </Link>

                  {/* User Menu */}
                  <div className="relative group">
                    <button className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center font-bold text-sm hover:scale-110 transition-transform">
                      {getUserInitials()}
                    </button>

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="p-3 border-b border-gray-700">
                        <p className="text-sm font-semibold truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Mi Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
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
                {user ? (
                  <>
                    <div className="px-4 py-2 bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-400">Conectado como</p>
                      <p className="text-sm font-semibold truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left text-red-400 hover:text-red-300 transition-colors font-medium py-2"
                    >
                      Cerrar Sesión
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
