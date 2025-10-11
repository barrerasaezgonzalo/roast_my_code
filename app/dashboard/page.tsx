import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Flame, TrendingUp, Award, Code, Shield } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Verificar autenticación
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/"); // Redirigir al home si no está logueado
  }

  // Obtener roasts del usuario
  const { data: roasts } = await supabase
    .from("roasts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  // Obtener estadísticas
  const { data: stats } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mi Dashboard</h1>
          <p className="text-gray-400">Bienvenido, {user.email}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Code className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold">
                {stats?.total_roasts || 0}
              </span>
            </div>
            <p className="text-gray-400 text-sm">Total Roasts</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-bold">
                {stats?.average_score?.toFixed(1) || "0.0"}
              </span>
            </div>
            <p className="text-gray-400 text-sm">Promedio</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold">
                {stats?.best_score || 0}
              </span>
            </div>
            <p className="text-gray-400 text-sm">Mejor Score</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Flame className="w-8 h-8 text-red-400" />
              <span className="text-3xl font-bold">
                {stats?.worst_score || 0}
              </span>
            </div>
            <p className="text-gray-400 text-sm">Peor Score</p>
          </div>
        </div>

        {/* Recent Roasts */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Roasts Recientes</h2>

          {!roasts || roasts.length === 0 ? (
            <div className="text-center py-12">
              <Flame className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">
                Aún no has roasteado ningún código
              </p>
              <Link
                href="/roast"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <Flame className="w-5 h-5" />
                Roast tu primer código
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {roasts.map((roast) => (
                <Link
                  key={roast.id}
                  href={`/roast/${roast.shareable_slug}`}
                  className="block bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-red-500/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-2xl font-bold ${
                          roast.score >= 8
                            ? "text-green-500"
                            : roast.score >= 5
                              ? "text-yellow-500"
                              : "text-red-500"
                        }`}
                      >
                        {roast.score}/10
                      </span>
                      <div>
                        <p className="font-semibold">{roast.language}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(roast.created_at).toLocaleDateString(
                            "es-ES",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500 uppercase">
                        {roast.roaster_mode}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {roast.code.substring(0, 100)}...
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
        {/* Security Settings - Solo para usuarios con email/password */}
        {user.app_metadata.provider === "email" && (
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-400" />
              Seguridad
            </h2>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Contraseña</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Última actualización:{" "}
                    {new Date(
                      user.updated_at || user.created_at,
                    ).toLocaleDateString("es-ES")}
                  </p>
                  <p className="text-xs text-gray-500">
                    🔒 Tu contraseña está encriptada y segura
                  </p>
                </div>
                <Link
                  href="/dashboard/change-password"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Cambiar Contraseña
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
