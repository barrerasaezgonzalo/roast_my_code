import { createClient } from "@supabase/supabase-js";
import { Trophy, Flame, TrendingDown, Code2 } from "lucide-react";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

export const metadata = {
  title: "Leaderboard - Los Peores Códigos 🔥 | RoastMyCode",
  description:
    "Hall of Shame: Los códigos con peores scores analizados por nuestra IA",
};

export const revalidate = 60; // Revalidar cada 60 segundos

export default async function LeaderboardPage() {
  // Obtener los peores códigos (score más bajo)
  const { data: worstCodes } = await supabase
    .from("roasts")
    .select(
      "id, shareable_slug, language, roaster_mode, score, reactions_count, created_at",
    )
    .eq("is_public", true)
    .order("score", { ascending: true })
    .order("reactions_count", { ascending: false })
    .limit(20);

  // Obtener estadísticas generales
  const { data: stats } = await supabase.from("roasts").select("score");

  const totalRoasts = stats?.length || 0;
  const avgScore = stats
    ? (stats.reduce((acc, r) => acc + r.score, 0) / totalRoasts).toFixed(1)
    : "0";

  // Contar roasts por lenguaje
  const languageCounts =
    worstCodes?.reduce(
      (acc, roast) => {
        acc[roast.language] = (acc[roast.language] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ) || {};

  const topLanguage = Object.entries(languageCounts).sort(
    (a, b) => b[1] - a[1],
  )[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 mb-4">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-red-300 font-semibold">
              Hall of Shame
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            🏆 Leaderboard
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Los códigos con peores scores de toda la comunidad.
            <br />
            <span className="text-red-400">¿Puedes hacerlo peor?</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Flame className="w-8 h-8 text-orange-400" />
              <span className="text-3xl font-bold">{totalRoasts}</span>
            </div>
            <p className="text-gray-400">Total Roasts</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="w-8 h-8 text-yellow-400" />
              <span className="text-3xl font-bold">{avgScore}</span>
            </div>
            <p className="text-gray-400">Score Promedio</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Code2 className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold">
                {topLanguage?.[0] || "N/A"}
              </span>
            </div>
            <p className="text-gray-400">Lenguaje + Popular</p>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              Top 20 Peores Códigos
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Actualizado en tiempo real
            </p>
          </div>

          {!worstCodes || worstCodes.length === 0 ? (
            <div className="p-12 text-center">
              <Flame className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">
                No hay roasts públicos todavía.
                <br />
                ¡Sé el primero en aparecer aquí!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                      Score
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                      Lenguaje
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                      Modo
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                      Reacciones
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                      Fecha
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {worstCodes.map((roast, index) => {
                    const rankIcon =
                      index === 0
                        ? "🥇"
                        : index === 1
                          ? "🥈"
                          : index === 2
                            ? "🥉"
                            : null;

                    return (
                      <tr
                        key={roast.id}
                        className="hover:bg-gray-700/30 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {rankIcon && (
                              <span className="text-2xl">{rankIcon}</span>
                            )}
                            <span className="text-lg font-bold text-gray-300">
                              #{index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`text-2xl font-bold ${
                              roast.score <= 2
                                ? "text-red-500"
                                : roast.score <= 4
                                  ? "text-orange-500"
                                  : "text-yellow-500"
                            }`}
                          >
                            {roast.score}/10
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {roast.language}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 capitalize">
                          {roast.roaster_mode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="flex items-center gap-1 text-gray-400">
                            ❤️ {roast.reactions_count || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {new Date(roast.created_at).toLocaleDateString(
                            "es-ES",
                            {
                              day: "numeric",
                              month: "short",
                            },
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Link
                            href={`/roast/${roast.shareable_slug}`}
                            className="text-red-400 hover:text-red-300 font-semibold text-sm transition-colors"
                          >
                            Ver Roast →
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">
            ¿Crees que tu código puede estar en el top?
          </p>
          <Link
            href="/roast"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <Flame className="w-5 h-5" />
            Roast My Code
          </Link>
        </div>
      </div>
    </div>
  );
}
