"use client";
import { useState } from "react";
import { Flame, Sparkles } from "lucide-react";
import AuthModal from "./AuthModal";
import { createClient } from "@/lib/supabase/client";

export default function CallToAction() {
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
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-600 to-red-700" />

        {/* Animated elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <Flame className="w-16 h-16 mx-auto mb-6 animate-flame" />

          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            ¿Listo para la verdad?
          </h2>

          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Únete a miles de devs que mejoran su código día a día
            <br />
            (después de llorar un poco)
          </p>

          <button
            onClick={() => handleLogin()}
            className="bg-white text-red-600 hover:bg-gray-100 px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/20"
          >
            Comenzar Gratis
          </button>

          <p className="text-sm mt-6 opacity-90 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Totalmente gratis • Ilimitado • Para siempre
          </p>
        </div>
      </section>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
