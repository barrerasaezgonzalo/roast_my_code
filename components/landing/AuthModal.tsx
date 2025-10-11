"use client";
import { useState } from "react";
import { X, Flame, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<"signup" | "login" | "reset">(
    "signup",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!email || !password) {
      setError("Email y contraseña son requeridos");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      if (authMode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;

        // Verificar si el usuario fue confirmado automáticamente
        const isConfirmed = data.user?.email_confirmed_at !== null;

        if (isConfirmed) {
          setMessage("¡Cuenta creada! Redirigiendo...");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setMessage("¡Revisa tu email para confirmar tu cuenta!");
        }

        setEmail("");
        setPassword("");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        window.location.reload();
      }
    } catch (err: any) {
      setError(err.message || "Error al autenticar");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!email) {
      setError("Ingresa tu email");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      setMessage(
        "📧 ¡Email enviado! Revisa tu bandeja de entrada para resetear tu contraseña.",
      );
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Error al enviar email de recuperación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full p-8 relative border border-gray-700 animate-slideUp">
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
            {authMode === "signup"
              ? "Crear Cuenta"
              : authMode === "login"
                ? "Iniciar Sesión"
                : "Recuperar Contraseña"}
          </h2>
          <p className="text-gray-400">
            {authMode === "signup"
              ? "100% gratis • Análisis ilimitado con AI"
              : authMode === "login"
                ? "Bienvenido de vuelta"
                : "Te enviaremos un link para resetear tu contraseña"}
          </p>
        </div>

        {/* Mensajes */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
            {message}
          </div>
        )}

        {/* Google Auth - solo en signup/login */}
        {authMode !== "reset" && (
          <div className="mb-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar con Google
            </button>
          </div>
        )}

        {/* Divider - solo en signup/login */}
        {authMode !== "reset" && (
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">
                o con email
              </span>
            </div>
          </div>
        )}

        {/* Email Form */}
        <form
          onSubmit={
            authMode === "reset" ? handlePasswordReset : handleEmailAuth
          }
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50"
          />

          {/* Password - solo en signup/login */}
          {authMode !== "reset" && (
            <>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña (mínimo 6 caracteres)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Forgot password link - solo en login */}
              {authMode === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("reset");
                      setError(null);
                      setMessage(null);
                    }}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
          >
            {loading
              ? "Cargando..."
              : authMode === "signup"
                ? "Crear Cuenta"
                : authMode === "login"
                  ? "Iniciar Sesión"
                  : "Enviar Email de Recuperación"}
          </button>
        </form>

        {/* Security message - solo en signup/login */}
        {authMode !== "reset" && (
          <div className="my-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <svg
              className="w-4 h-4 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>
              Contraseñas encriptadas con{" "}
              <span className="text-purple-400 font-medium">Supabase Auth</span>
            </span>
          </div>
        )}

        {/* Toggle Mode */}
        <p className="text-center text-sm text-gray-400">
          {authMode === "reset" ? (
            <>
              ¿Recordaste tu contraseña?{" "}
              <button
                onClick={() => {
                  setAuthMode("login");
                  setError(null);
                  setMessage(null);
                }}
                className="text-red-400 hover:text-red-300 font-semibold transition-colors"
              >
                Inicia sesión
              </button>
            </>
          ) : authMode === "signup" ? (
            <>
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={() => {
                  setAuthMode("login");
                  setError(null);
                  setMessage(null);
                }}
                className="text-red-400 hover:text-red-300 font-semibold transition-colors"
              >
                Inicia sesión
              </button>
            </>
          ) : (
            <>
              ¿No tienes cuenta?{" "}
              <button
                onClick={() => {
                  setAuthMode("signup");
                  setError(null);
                  setMessage(null);
                }}
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
