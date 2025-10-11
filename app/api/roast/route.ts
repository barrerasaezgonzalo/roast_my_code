import { NextRequest, NextResponse } from "next/server";
import { roastCode } from "@/lib/ai/groq";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

function generateSlug(): string {
  return Math.random().toString(36).substring(2, 10);
}

function getClientIP(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return realIP || null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, language, mode } = body;

    // Validaciones
    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    if (code.length < 10) {
      return NextResponse.json(
        { error: "Code is too short (minimum 10 characters)" },
        { status: 400 },
      );
    }

    if (code.length > 5000) {
      return NextResponse.json(
        { error: "Code is too long (maximum 5000 characters)" },
        { status: 400 },
      );
    }

    if (!language || typeof language !== "string") {
      return NextResponse.json(
        { error: "Language is required" },
        { status: 400 },
      );
    }

    const validModes = ["savage", "sarcastic", "meme", "chuck"];
    if (!mode || !validModes.includes(mode)) {
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }

    // Obtener usuario actual desde el token de autorización
    let userId: string | null = null;
    try {
      const authHeader = request.headers.get("authorization");

      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);

        const {
          data: { user },
          error,
        } = await supabaseAdmin.auth.getUser(token);

        if (!error && user) {
          userId = user.id;
          console.log("👤 Usuario logueado:", user.email);
        } else {
          console.log("👤 Usuario anónimo (token inválido o expirado)");
        }
      } else {
        console.log("👤 Usuario anónimo (sin token)");
      }
    } catch (err) {
      console.log("⚠️ Error al verificar usuario:", err);
      console.log("👤 Continuando como anónimo");
    }

    console.log("🔥 Roasting code with Groq AI...");

    const roastResult = await roastCode(code, language, mode);

    let slug = generateSlug();
    let attempts = 0;

    while (attempts < 5) {
      const { data: existing } = await supabaseAdmin
        .from("roasts")
        .select("id")
        .eq("shareable_slug", slug)
        .single();

      if (!existing) break;
      slug = generateSlug();
      attempts++;
    }

    console.log("💾 Saving to Supabase...");

    const { data, error } = await supabaseAdmin
      .from("roasts")
      .insert({
        code,
        language,
        roaster_mode: mode,
        roast_result: roastResult,
        score: roastResult.scores.overall,
        is_public: true,
        shareable_slug: slug,
        ip_address: getClientIP(request),
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Error al guardar en la base de datos");
    }

    console.log(
      "✅ Roast saved successfully! ID:",
      data.id,
      "User:",
      userId || "anonymous",
    );

    return NextResponse.json({
      success: true,
      roast: roastResult,
      id: data.id,
      slug: slug,
    });
  } catch (error: any) {
    console.error("❌ API Error:", error);

    if (
      error.message.includes("rate_limit") ||
      error.message.includes("Demasiadas solicitudes")
    ) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Espera un momento." },
        { status: 429 },
      );
    }

    return NextResponse.json(
      {
        error:
          error.message || "Error al analizar el código. Intenta de nuevo.",
      },
      { status: 500 },
    );
  }
}
