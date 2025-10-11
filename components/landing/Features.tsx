import { Zap, Trophy, Code2, Shield, Sparkles, Brain } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Brutalmente Honesta",
    description:
      "Inteligencia Artificial sin filtros. Sin piedad. Solo verdades dolorosas sobre tu código envueltas en sarcasmo de calidad.",
    color: "from-purple-500 to-blue-500",
    badge: "AI Powered",
  },
  {
    icon: Zap,
    title: "Mejoras Reales",
    description:
      "Detrás del humor hay análisis serio: refactoring, best practices y sugerencias concretas que funcionan.",
    color: "from-orange-500 to-yellow-500",
    badge: "Instant",
  },
  {
    icon: Trophy,
    title: "Compartible en Redes",
    description:
      "Comparte tus roasts épicos (o vergonzosos) con un click. Compite en el leaderboard semanal.",
    color: "from-yellow-500 to-red-500",
    badge: "Social",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-4">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-semibold">
              Análisis impulsado por AI
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            ¿Por qué RoastMyCode?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Mejora tu código mientras te ríes (o lloras) con el feedback más
            honesto que encontrarás
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-orange-500/0 group-hover:from-red-500/5 group-hover:to-orange-500/5 rounded-2xl transition-all duration-300" />

              {/* Content */}
              <div className="relative">
                {/* Badge */}
                <div className="absolute -top-4 -right-4">
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {feature.badge}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-red-400 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional features list */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 text-gray-300">
            <Code2 className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span>Soporta 8+ lenguajes</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Shield className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span>Tu código es privado</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <span className="font-semibold">100% Gratis</span>
          </div>
        </div>
      </div>
    </section>
  );
}
