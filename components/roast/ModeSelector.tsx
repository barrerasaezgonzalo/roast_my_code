"use client";
import { Flame, SmilePlus, Image, Zap  } from "lucide-react";

interface ModeSelectorProps {
  value: string;
  onChange: (mode: string) => void;
}

const modes = [
  {
    id: "savage",
    name: "Savage",
    icon: Flame,
    description: "Sin piedad, máximo sarcasmo",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "sarcastic",
    name: "Sarcastic",
    icon: SmilePlus,
    description: "Humor inteligente",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "meme",
    name: "Meme Lord",
    icon: Image,
    description: "Referencias de memes",
    color: "from-purple-500 to-pink-500",
  },
 {
    id: 'chuck',
    name: 'Chuck Norris',
    icon: Zap,
    description: 'Tu código no sobrevivirá',
    color: 'from-yellow-500 to-red-500',
  },
];

export default function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div className="space-y-3">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isSelected = value === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
              isSelected
                ? "border-red-500 bg-red-500/10"
                : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${mode.color} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{mode.name}</span>
                  {isSelected && (
                    <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                      Seleccionado
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400">{mode.description}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
