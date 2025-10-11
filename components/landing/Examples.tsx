"use client";
import { useState } from "react";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";

const examples = [
  {
    language: "JavaScript",
    score: "2/10",
    roast:
      "Usaste 'var' en 2024. Impresionante. Negativamente. ¿También navegas con Internet Explorer?",
    likes: 234,
    color: "from-yellow-500 to-orange-500",
  },
  {
    language: "Python",
    score: "4/10",
    roast:
      "Esta función tiene más parámetros que amigos en Facebook. Considera refactorizar o terapia.",
    likes: 189,
    color: "from-blue-500 to-cyan-500",
  },
  {
    language: "React",
    score: "3/10",
    roast:
      "6 useEffect sin dependencias. ¿Esto es código o ruleta rusa? Al menos el casino es más predecible.",
    likes: 312,
    color: "from-cyan-500 to-blue-500",
  },
];

export default function Examples() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Roasts Recientes 🔥
          </h2>
          <p className="text-xl text-gray-400">
            Otros devs sufriendo en tiempo real
          </p>
        </div>

        {/* Examples grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {examples.map((example, idx) => (
            <div
              key={idx}
              className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              {/* User info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${example.color} rounded-full`}
                  />
                  <div>
                    <p className="font-semibold">#{example.language}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">hace 2h</span>
              </div>

              {/* Roast text */}
              <div className="bg-gray-900/80 rounded-lg p-4 mb-4 border-l-4 border-red-500">
                <p className="text-sm text-gray-300 leading-relaxed">
                  "{example.roast}"
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{example.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">12</span>
                  </button>
                  <button
                    aria-label="Share"
                    className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="sr-only">Share</span>
                  </button>
                </div>
                <span className="text-2xl font-bold text-red-500">
                  {example.score}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View more button */}
        <div className="text-center mt-10">
          <button className="border border-gray-600 hover:border-red-500 hover:bg-red-500/10 px-6 py-3 rounded-lg font-semibold transition-all duration-300">
            Ver más roasts →
          </button>
        </div>
      </div>
    </section>
  );
}
