"use client";
import { useState } from "react";
import { Flame, ChevronRight, Sparkles, Zap } from "lucide-react";
import AuthModal from "./AuthModal";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function Hero() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const supabase = createClient();

  const handleLogin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setShowAuthModal(true);
    } else {
      window.location.href = "/roast";
    }
  };

  return (
    <>
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Powered by AI • 1,247 códigos asados hoy
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="inline-flex items-center gap-3 mb-2">
              Tu código{" "}
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white text-3xl sm:text-4xl lg:text-5xl animate-pulse">
                AI
              </span>
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500 animate-gradient">
              apesta
            </span>
            .<br />
            Déjanos decirte por qué.
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Inteligencia Artificial
            </span>{" "}
            brutalmente honesta que analiza tu código, lo destroza con humor y
            te da sugerencias reales para mejorarlo. Sin piedad. Sin filtros.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <button
              onClick={() => handleLogin()}
              className="group bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
            >
              <Flame className="w-5 h-5 group-hover:animate-flame" />
              Roast My Code Now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link href="/roast">
              <button className="border-2 cursor-pointer border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                Ver Ejemplo
              </button>
            </Link>
          </div>

          {/* Small text - ACTUALIZADO */}
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            100% Gratis • Ilimitado • No se requiere tarjeta
          </p>

          {/* Code example preview */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-auto text-xs text-gray-500 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-purple-400" />
                  AI Analysis
                </span>
              </div>
              <div className="text-left font-mono text-sm">
                <div className="text-gray-500">1</div>
                <div className="text-gray-500">2</div>
                <div className="text-gray-300">
                  <span className="text-purple-400">function</span>{" "}
                  <span className="text-yellow-400">user</span>() {"{"}
                  <br />
                  {"  "}
                  <span className="text-purple-400">var</span> x ={" "}
                  <span className="text-green-400">1</span>;<br />
                  {"  "}
                  <span className="text-purple-400">var</span> y ={" "}
                  <span className="text-green-400">2</span>;<br />
                  {"  "}
                  <span className="text-purple-400">return</span> x + y;
                  <br />
                  {"}"}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-start gap-3">
                  <Flame className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-red-400 font-semibold mb-2">
                      "Ah, 'var'. Veo que viajaste desde 2010."
                    </p>
                    <p className="text-gray-400 text-sm">
                      ✅ Usa{" "}
                      <code className="text-orange-400 bg-gray-800 px-2 py-1 rounded">
                        const
                      </code>{" "}
                      para variables inmutables
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
