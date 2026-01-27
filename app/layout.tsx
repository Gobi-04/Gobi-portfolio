import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gobinath | Full Stack Developer",
  description: "Next.js Full Stack Developer Portfolio",

};

import Scene from "@/components/hero/Scene";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <Scene />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
