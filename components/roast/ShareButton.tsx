"use client";
import {
  Share2,
  Check,
  Linkedin,
  Mail,
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
    name: 'X (Twitter)',
    icon: XIcon,
    color: 'hover:bg-black',
    action: () => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`,
        '_blank',
        'width=550,height=420'
      )
      setShowMenu(false)
    }
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'hover:bg-blue-600',
    action: () => {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        '_blank',
        'width=550,height=420'
      )
      setShowMenu(false)
    }
  },
  {
    name: 'Reddit',
    icon: MessageCircle,
    color: 'hover:bg-orange-600',
    action: () => {
      window.open(
        `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
        '_blank',
        'width=550,height=420'
      )
      setShowMenu(false)
    }
  },
  {
    name: 'Hacker News',
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z"/>
      </svg>
    ),
    color: 'hover:bg-orange-500',
    action: () => {
      window.open(
        `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(url)}&t=${encodeURIComponent(text)}`,
        '_blank',
        'width=550,height=420'
      )
      setShowMenu(false)
    }
  },
  {
    name: 'WhatsApp',
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
    color: 'hover:bg-green-600',
    action: () => {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${url}`)}`,
        '_blank'
      )
      setShowMenu(false)
    }
  },
  {
    name: 'Telegram',
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    color: 'hover:bg-sky-500',
    action: () => {
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        '_blank'
      )
      setShowMenu(false)
    }
  }, 
  {
    name: 'Email',
    icon: Mail,
    color: 'hover:bg-blue-500',
    action: () => {
      window.location.href = `mailto:?subject=${encodeURIComponent(`¡Mira mi código roasted!`)}&body=${encodeURIComponent(`${text}\n\nVer roast completo: ${url}`)}`
      setShowMenu(false)
    }
  },
  {
    name: 'Copiar Link',
    icon: Share2,
    color: 'hover:bg-purple-600',
    action: async () => {
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        setShowMenu(false)
      } catch (err) {
        alert('No se pudo copiar el link')
      }
    }
  }
]

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
