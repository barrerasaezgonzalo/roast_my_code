"use client";
import {
  Share2,
  Check,
  Linkedin,
  MessageCircle,
  X as XIcon,
} from "lucide-react";
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
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/roast/${slug}`
      : "";
  const text = `Mi código ${language} obtuvo ${score}/10 en RoastMyCode 🔥\n\n¿Puedes hacerlo mejor?`;
  const hashtags = "RoastMyCode,CodeReview,AI";

  const shareOptions = [
    {
      name: "X (Twitter)",
      icon: XIcon,
      color: "hover:bg-black",
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`,
          "_blank",
          "width=550,height=420",
        );
        setShowMenu(false);
      },
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "hover:bg-blue-600",
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
          "width=550,height=420",
        );
        setShowMenu(false);
      },
    },
    {
      name: "Reddit",
      icon: MessageCircle,
      color: "hover:bg-orange-600",
      action: () => {
        window.open(
          `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
          "_blank",
          "width=550,height=420",
        );
        setShowMenu(false);
      },
    },
    {
      name: "Dev.to",
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z" />
        </svg>
      ),
      color: "hover:bg-gray-800",
      action: () => {
        // Dev.to requiere crear un post manualmente, así que copiamos el link
        navigator.clipboard.writeText(url);
        window.open("https://dev.to/new", "_blank");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setShowMenu(false);
      },
    },
    {
      name: "Copiar Link",
      icon: Share2,
      color: "hover:bg-purple-600",
      action: async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          setShowMenu(false);
        } catch (err) {
          console.log("No se pudo copiar el link", err);
          alert("No se pudo copiar el link");
        }
      },
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
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

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          {/* Overlay para cerrar al hacer click afuera */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden animate-slideDown">
            <div className="p-2">
              <p className="text-xs text-gray-400 px-3 py-2 font-semibold uppercase">
                Compartir en:
              </p>
              {shareOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <button
                    key={index}
                    onClick={option.action}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-200 transition-all ${option.color}`}
                  >
                    <Icon className="w-5 h-5" />
                    {option.name}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
