import { StoreProvider } from "@/redux/StoreProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Info Auto-Entrepreneur | Accueil",
  description:
    "Découvrez les services d'Info Auto-Entrepreneur. Services pour les auto-entrepreneurs.",
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
        <GoogleTagManager gtmId="GTM-TB8QF4NV" />
      </html>
    </StoreProvider>
  );
}
