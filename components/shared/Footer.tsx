import {
  Flame,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-8 h-8 text-red-500" />
              <span className="text-xl font-bold">
                Roast<span className="text-red-500">My</span>Code
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Análisis de código impulsado por{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-semibold">
                Inteligencia Artificial
              </span>
              . Mejora tu código mientras te diviertes.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>100% Gratis • Ilimitado • Para siempre</span>
            </div>
          </div>

          {/* Product */}
          <div className="text-right">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/roast"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Roast Code
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Acerca de
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Términos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm flex items-center gap-1">
            © {currentYear} RoastMyCode. Asando código desde el infierno
            <Flame className="w-4 h-4 text-red-500" />
          </p>

          {/* Social Links - Ahora con Link para internos y a tag para externos */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">Linkedin</span>
            </a>

            <a
              href="mailto:hola@roastmycode.cl"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
              <span className="sr-only">EMail</span>
            </a>
          </div>
        </div>

        {/* Made with love */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            Hecho con <Flame className="w-4 h-4 text-red-500 fill-red-500" /> y
            mucha{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-semibold">
              AI
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
