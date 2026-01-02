import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CycleFlow - Calculateur de Cycle Menstruel",
  description:
    "Application simple et élégante pour suivre votre cycle menstruel, calculer l'ovulation et les périodes fertiles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`bg-linear-to-br from-pink-50 to-purple-50`}
      >
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
