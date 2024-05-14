import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StoreProvider } from "../../redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Info Auto-Entrepreneur, avec Autoentrepreneur-Info",
  description: "Devenez auto-entrepreneur en quelques clics",
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
