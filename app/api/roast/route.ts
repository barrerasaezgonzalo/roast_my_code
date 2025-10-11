import { NextRequest, NextResponse } from "next/server";
import { roastCode } from "@/lib/ai/groq";
import { createClient } from "@supabase/supabase-js";

// Cliente SIN tipos genéricos
const supabase = createClient(
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

    const validModes = ["savage", "sarcastic", "meme", "gordon"];
    if (!mode || !validModes.includes(mode)) {
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }

    console.log("🔥 Roasting code with Groq AI...");

    const roastResult = await roastCode(code, language, mode);

    let slug = generateSlug();
    let attempts = 0;

    while (attempts < 5) {
      const { data: existing } = await supabase
        .from("roasts")
        .select("id")
        .eq("shareable_slug", slug)
        .single();

      if (!existing) break;
      slug = generateSlug();
      attempts++;
    }

    console.log("💾 Saving to Supabase...");

    const { data, error } = await supabase
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
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Error al guardar en la base de datos");
    }

    console.log("✅ Roast saved successfully!", data.id);

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
