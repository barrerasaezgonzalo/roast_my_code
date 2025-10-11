import CodeEditor from "@/components/roast/CodeEditor";

export const metadata = {
  title: "Roast My Code - AI Code Analyzer",
  description: "Pega tu código y recibe feedback brutal de nuestra IA",
};

export default function RoastPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Roast My Code con{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              AI
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Pega tu código y prepárate para la verdad... brutal
          </p>
          <p className="text-gray-400 text-lg">
            Inicia sessión para particular en el Leaderboard, y ganar puntos y
            poder compartir tus resultados.
          </p>
        </div>

        {/* Editor Component */}
        <CodeEditor />
      </div>
    </div>
  );
}
