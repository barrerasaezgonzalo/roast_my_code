"use client";
import { Share2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  slug: string;
  score: number;
  language: string;
}

export default function ShareButton({
  slug,
  score,
  language,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/roast/${slug}`;
    const text = `Mi código ${language} obtuvo ${score}/10 en RoastMyCode 🔥\n\n¿Puedes hacerlo mejor?`;

    // Intentar usar Web Share API (móviles)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Score: ${score}/10 🔥`,
          text: text,
          url: url,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copiar al clipboard
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        alert("No se pudo copiar el link");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
    >
      {copied ? (
        <>
          <Check className="w-5 h-5" />
          ¡Copiado!
        </>
      ) : (
        <>
          <Share2 className="w-5 h-5" />
          Compartir
        </>
      )}
    </button>
  );
}
