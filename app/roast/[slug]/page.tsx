import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import RoastResult from "@/components/roast/RoastResult";
import { Flame, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import ShareButton from "@/components/roast/ShareButton";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RoastDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Obtener el roast desde Supabase
  const { data: roast, error } = await supabase
    .from("roasts")
    .select("*")
    .eq("shareable_slug", slug)
    .single();

  if (error || !roast) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/roast"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Roast otro código
          </Link>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-2 flex items-center gap-3">
                <Flame className="w-10 h-10 text-red-500" />
                Roast Result
              </h1>
              <p className="text-gray-400">
                {roast.language} • {roast.roaster_mode} mode
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2">
              <ShareButton
                slug={slug}
                score={roast.score}
                language={roast.language}
              />
            </div>
          </div>
        </div>

        {/* Code Display */}
        <div className="mb-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Código Analizado</h2>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm font-mono text-gray-300">
              <code>{roast.code}</code>
            </pre>
          </div>
        </div>

        {/* Result */}
        <RoastResult
          result={roast.roast_result as any}
          code={roast.code}
          language={roast.language}
        />

        {/* Footer info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Roasteado el{" "}
            {new Date(roast.created_at).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

// Metadata dinámica para SEO y Open Graph
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const { data: roast } = await supabase
    .from("roasts")
    .select("score, language, roaster_mode")
    .eq("shareable_slug", slug)
    .single();

  if (!roast) {
    return {
      title: "Roast no encontrado",
    };
  }

  return {
    title: `Mi código ${roast.language} obtuvo ${roast.score}/10 🔥 | RoastMyCode`,
    description: `La IA analizó mi código ${roast.language} en modo ${roast.roaster_mode} y me dio ${roast.score}/10. ¿Puedes hacerlo mejor?`,
    openGraph: {
      title: `Score: ${roast.score}/10 🔥`,
      description: `Código ${roast.language} analizado por IA`,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `Mi código obtuvo ${roast.score}/10 🔥`,
      description: `¿Puedes hacerlo mejor? Roastea tu código con IA`,
    },
  };
}
