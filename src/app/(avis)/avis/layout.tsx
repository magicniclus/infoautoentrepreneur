import { StoreProvider } from "@/redux/StoreProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../../../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Info Auto-Entrepreneur | Avis sur les outils pour auto-entrepreneurs",
  description:
    "Découvrez les avis sur le service Info Auto-Entrepreneur. Comparatif des avis sur notre service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="fr">
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </StoreProvider>
  );
}
