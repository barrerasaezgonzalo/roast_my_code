"use client";
import {
  Flame,
  AlertCircle,
  AlertTriangle,
  Info,
  Copy,
  RotateCcw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { RoastResponse } from "@/lib/ai/groq";

interface RoastResultProps {
  result: RoastResponse;
  code: string;
  language: string;
}

export default function RoastResult({ result }: RoastResultProps) {
  const router = useRouter();

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "border-red-500/30 bg-red-500/5";
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/5";
      default:
        return "border-blue-500/30 bg-blue-500/5";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 5) return "text-yellow-500";
    return "text-red-500";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.roastText);
    alert("¡Roast copiado!");
  };

  return (
    <div className="space-y-6 animate-slideUp">
      {/* Score Overview */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Flame className="w-6 h-6 text-red-500" />
            Análisis Completado
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Copiar roast"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Score Badge */}
        <div className="text-center mb-6">
          <div
            className={`text-6xl font-bold ${getScoreColor(result.scores.overall)} mb-2`}
          >
            {result.scores.overall}/10
          </div>
          <p className="text-gray-400">Score General</p>
        </div>

        {/* Detailed Scores */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${getScoreColor(result.scores.readability)}`}
            >
              {result.scores.readability}
            </div>
            <p className="text-xs text-gray-400 mt-1">Legibilidad</p>
          </div>
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${getScoreColor(result.scores.bestPractices)}`}
            >
              {result.scores.bestPractices}
            </div>
            <p className="text-xs text-gray-400 mt-1">Best Practices</p>
          </div>
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${getScoreColor(result.scores.performance)}`}
            >
              {result.scores.performance}
            </div>
            <p className="text-xs text-gray-400 mt-1">Performance</p>
          </div>
        </div>
      </div>

      {/* Roast Text */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5 text-red-500" />
          El Veredicto
        </h3>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {result.roastText}
          </p>
        </div>
      </div>

      {/* Line Issues */}
      {result.lineIssues && result.lineIssues.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Problemas Específicos</h3>
          <div className="space-y-4">
            {result.lineIssues.map((issue, idx) => (
              <div
                key={idx}
                className={`border rounded-lg p-4 ${getSeverityColor(issue.severity)}`}
              >
                <div className="flex items-start gap-3">
                  {getSeverityIcon(issue.severity)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono bg-gray-900 px-2 py-1 rounded">
                        Línea {issue.line}
                      </span>
                      <span className="text-xs uppercase font-semibold text-gray-400">
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-sm font-semibold mb-2">
                      {issue.message}
                    </p>
                    <div className="bg-gray-900/50 rounded p-3 mt-2">
                      <p className="text-xs text-gray-400 mb-1">
                        ✅ Sugerencia:
                      </p>
                      <p className="text-sm text-green-400">
                        {issue.suggestion}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      <div>
        <button
          onClick={() => router.push("/roast")}
          className="w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Roast Otro Código
        </button>
      </div>
    </div>
  );
}
