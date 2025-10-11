import Link from "next/link";
import { Flame, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Flame className="w-20 h-20 text-red-500 mx-auto mb-6 animate-pulse" />

        <h1 className="text-6xl font-bold mb-4">404</h1>

        <h2 className="text-2xl font-bold mb-4">Roast no encontrado</h2>

        <p className="text-gray-400 mb-8">
          Este roast no existe o fue eliminado.
          <br />
          ¿Por qué no roasteas algo nuevo?
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Home className="w-5 h-5" />
            Inicio
          </Link>

          <Link
            href="/roast"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Search className="w-5 h-5" />
            Roast Nuevo Código
          </Link>
        </div>
      </div>
    </div>
  );
}
