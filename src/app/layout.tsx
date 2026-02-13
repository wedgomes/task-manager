import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers"; // Verifique se o caminho está certo

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Desafio Técnico Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased bg-gray-50">
        {/* O Providers precisa estar AQUI, envolvendo o children */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}