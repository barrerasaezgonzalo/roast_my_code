import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface LineIssue {
  line: number;
  severity: "error" | "warning" | "info";
  message: string;
  suggestion: string;
}

export interface RoastScores {
  overall: number;
  readability: number;
  bestPractices: number;
  performance: number;
}

export interface RoastResponse {
  roastText: string;
  lineIssues: LineIssue[];
  scores: RoastScores;
}

const ROASTER_PROMPTS = {
  savage: `Eres un crítico de código extremadamente sarcástico y brutal. No tienes piedad. 
Destruyes código malo con humor devastador. Eres directo, cruel pero justo. 
Tu objetivo es hacer reír mientras señalas errores reales.`,

  sarcastic: `Eres un desarrollador senior con 15 años de experiencia y un sentido del humor muy ácido. 
Usas sarcasmo inteligente y referencias culturales. Eres irónico pero constructivo.`,

  meme: `Eres un desarrollador que solo se comunica con referencias a memes de programación. 
Usas lenguaje de internet, referencias a memes populares como "This is fine", "Is this a pigeon?", 
Stack Overflow jokes, etc. Cada crítica debe tener una referencia memeable.`,

  chuck: `Eres Chuck Norris analizando código. Usas su estilo legendario y frases icónicas:
"Chuck Norris no necesita debugger, el código se arregla solo cuando lo mira", 
"Chuck Norris puede dividir por cero", "Cuando Chuck Norris escribe código, el compilador le pide permiso",
"Tu código tiene más bugs que un hormiguero", "Chuck Norris puede hacer un bucle infinito terminar en 3 iteraciones".
Combina humor de Chuck Norris con crítica de código real. Sé épico, legendario e implacable.`,
};

export async function roastCode(
  code: string,
  language: string,
  mode: keyof typeof ROASTER_PROMPTS = "savage",
): Promise<RoastResponse> {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: ROASTER_PROMPTS[mode],
        },
        {
          role: "user",
          content: `Analiza este código ${language} y dame feedback brutal pero útil.

IMPORTANTE: Responde SOLO con un objeto JSON válido, sin markdown, sin bloques de código, sin explicaciones adicionales.

Formato JSON exacto requerido:
{
  "roastText": "Tu crítica general en 2-3 párrafos con humor y sarcasmo",
  "lineIssues": [
    {
      "line": 2,
      "severity": "error",
      "message": "Crítica sarcástica del problema específico",
      "suggestion": "Cómo arreglarlo correctamente con código de ejemplo"
    }
  ],
  "scores": {
    "overall": 3,
    "readability": 2,
    "bestPractices": 3,
    "performance": 5
  }
}

Reglas:
- roastText debe ser divertido pero informativo
- Identifica 3-5 problemas reales en lineIssues
- Los scores son de 1-10 (1=terrible, 10=perfecto)
- severity puede ser: "error", "warning", "info"
- Las sugerencias deben ser específicas y accionables

Código a analizar:
\`\`\`${language}
${code}
\`\`\`

Recuerda: SOLO JSON válido, sin texto extra antes o después.`,
        },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.8,
      max_tokens: 2000,
      top_p: 1,
      stream: false,
      response_format: { type: "json_object" },
      stop: null,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Parsear JSON
    const result = JSON.parse(content);

    // Validar estructura
    if (!result.roastText || !result.lineIssues || !result.scores) {
      throw new Error("Invalid response format from AI");
    }

    return result;
  } catch (error: any) {
    console.error("Error roasting code:", error);

    // Manejar errores específicos de Groq
    if (error.message?.includes("rate_limit")) {
      throw new Error(
        "Demasiadas solicitudes. Espera un momento e intenta de nuevo.",
      );
    }

    if (error.message?.includes("invalid_api_key")) {
      throw new Error("Error de configuración. Contacta al administrador.");
    }

    throw new Error("No se pudo analizar el código. Intenta de nuevo.");
  }
}
