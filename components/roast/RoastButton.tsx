"use client";
import { useState } from "react";
import { Flame, Loader2, CheckCircle2 } from "lucide-react";
import RoastResult from "./RoastResult";
import type { RoastResponse } from "@/lib/ai/groq";

interface RoastButtonProps {
  code: string;
  language: string;
  mode: string;
}

export default function RoastButton({
  code,
  language,
  mode,
}: RoastButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RoastResponse | null>(null);

  const handleRoast = async () => {
    // Validaciones
    if (!code || code.trim().length < 10) {
      setError("El código es muy corto (mínimo 10 caracteres)");
      return;
    }

    if (code.length > 5000) {
      setError("El código es muy largo (máximo 5000 caracteres)");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language, mode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to roast");
      }

      setResult(data.roast);

      // Scroll suave a resultados
      setTimeout(() => {
        document.getElementById("roast-result")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (err: any) {
      setError(err.message || "Algo salió mal. Intenta de nuevo.");
      console.error("Roast error:", err);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !code || code.trim().length < 10;

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={handleRoast}
          disabled={isDisabled}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
            isDisabled
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 transform hover:scale-105 shadow-lg shadow-red-500/30"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Asando tu código...
            </>
          ) : result ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Roast Completado
            </>
          ) : (
            <>
              <Flame className="w-5 h-5" />
              🔥 Roast It!
            </>
          )}
        </button>

        {error && (
          <p className="text-red-400 text-sm mt-3 text-center bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            {error}
          </p>
        )}

        {!loading && !result && code.trim().length < 10 && (
          <p className="text-gray-500 text-xs mt-2 text-center">
            Escribe al menos 10 caracteres para continuar
          </p>
        )}
      </div>

      {/* Resultado */}
      {result && (
        <div id="roast-result">
          <RoastResult result={result} code={code} language={language} />
        </div>
      )}
    </div>
  );
}
