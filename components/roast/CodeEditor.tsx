"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import LanguageSelector from "./LanguageSelector";
import ModeSelector from "./ModeSelector";
import RoastButton from "./RoastButton";
import { Code2, Sparkles } from "lucide-react";

// Importar Monaco dinámicamente (solo en cliente)
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-900 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Cargando editor...</p>
      </div>
    </div>
  ),
});

export default function CodeEditor() {
  const [code, setCode] = useState(`// Pega tu código aquí
function example() {
  var x = 1;
  var y = 2;
  return x + y;
}`);

  const [language, setLanguage] = useState("javascript");
  const [mode, setMode] = useState("savage");

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Editor Section - 2/3 */}
      <div className="lg:col-span-2 space-y-4">
        {/* Editor Header */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-t-xl p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-red-500" />
              <h2 className="font-semibold text-lg">Tu Código</h2>
            </div>
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="border border-gray-700 rounded-b-xl overflow-hidden">
          <MonacoEditor
            height="500px"
            language={language}
            value={code}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
              padding: { top: 16, bottom: 16 },
            }}
          />
        </div>

        {/* Code Stats */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              Líneas: {code.split("\n").length}
            </span>
            <span
              className={`font-semibold ${
                code.length < 10
                  ? "text-red-400"
                  : code.length > 5000
                    ? "text-red-400"
                    : "text-green-400"
              }`}
            >
              {code.length} / 5000
            </span>
            <span className="text-gray-400">
              Lenguaje:{" "}
              <span className="text-white font-semibold">{language}</span>
            </span>
          </div>
        </div>

        {/* Validation Messages */}
        {code.length < 10 && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-sm text-yellow-400 flex items-center gap-2">
            <span>⚠️</span>
            <span>Mínimo 10 caracteres requeridos</span>
          </div>
        )}

        {code.length > 5000 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-400 flex items-center gap-2">
            <span>❌</span>
            <span>Excede el máximo de 5000 caracteres</span>
          </div>
        )}

        {code.length >= 10 && code.length <= 5000 && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-sm text-green-400 flex items-center gap-2">
            <span>✅</span>
            <span>Listo para roast</span>
          </div>
        )}
      </div>

      {/* Settings Panel - 1/3 */}
      <div className="space-y-4">
        {/* AI Badge */}
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              AI Powered
            </span>
          </div>
          <p className="text-sm text-gray-400">
            Análisis en tiempo real con Inteligencia Artificial
          </p>
        </div>

        {/* Mode Selector */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            Personalidad del Roaster
          </h3>
          <ModeSelector value={mode} onChange={setMode} />
        </div>

        {/* Roast Button */}
        <RoastButton code={code} language={language} mode={mode} />

        {/* Tips */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
          <h4 className="font-semibold mb-2 text-sm">💡 Tips</h4>
          <ul className="text-xs text-gray-400 space-y-2">
            <li>• Pega código real para mejores resultados</li>
            <li>• Mínimo 10 caracteres</li>
            <li>• Máximo 5000 caracteres</li>
            <li>• Soporta 8+ lenguajes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
