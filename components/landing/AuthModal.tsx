"use client";
import { useState } from "react";
import { X, Github, Mail, Flame } from "lucide-react";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");

  const handleGitHubLogin = () => {
    // TODO: Implementar Supabase auth
    console.log("GitHub login");
  };

  const handleGoogleLogin = () => {
    // TODO: Implementar Supabase auth
    console.log("Google login");
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full p-8 relative border border-gray-700 animate-slideUp">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <Flame className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">
            {authMode === "signup" ? "Crear Cuenta" : "Iniciar Sesión"}
          </h2>
          <p className="text-gray-400">
            {authMode === "signup"
              ? "100% gratis • Análisis ilimitado con AI"
              : "Bienvenido de vuelta"}
          </p>
        </div>

        {/* Social Auth */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleGitHubLogin}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105"
          >
            <Github className="w-5 h-5" />
            Continuar con GitHub
          </button>
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            Continuar con Google
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">o con email</span>
          </div>
        </div>

        {/* Email Auth */}
        <div className="space-y-4 mb-6">
          <input
            type="email"
            placeholder="tu@email.com"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
          />
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
            {authMode === "signup" ? "Crear Cuenta" : "Iniciar Sesión"}
          </button>
        </div>

        {/* Toggle auth mode */}
        <p className="text-center text-sm text-gray-400">
          {authMode === "signup" ? (
            <>
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={() => setAuthMode("login")}
                className="text-red-400 hover:text-red-300 font-semibold transition-colors"
              >
                Inicia sesión
              </button>
            </>
          ) : (
            <>
              ¿No tienes cuenta?{" "}
              <button
                onClick={() => setAuthMode("signup")}
                className="text-red-400 hover:text-red-300 font-semibold transition-colors"
              >
                Regístrate
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
