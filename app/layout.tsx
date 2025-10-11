import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "RoastMyCode - La IA para programadores que destroza tu código con sarcasmo y estilo",
  description:
    "Deja que nuestra inteligencia artificial analice tu código y te diga, con brutal honestidad y humor, por qué apesta (o sorprendentemente no). Perfecto para devs con sentido del humor.",
  keywords: [
    "roast my code",
    "code roast",
    "code review divertido",
    "análisis de código con IA",
    "humor programadores",
    "roast de código",
    "IA para programadores",
  ],
  openGraph: {
    title: "RoastMyCode",
    description: "IA que analiza código con humor",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        {/* Google Analytics */}
        {/* <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RH2X5EZ5NF"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-RH2X5EZ5NF');
              }
            `,
          }}
        /> */}
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
