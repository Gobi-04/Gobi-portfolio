import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Noise from "@/components/ui/Noise";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gobinath | Full Stack Developer",
  description: "Next.js Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#030014] relative selection:bg-purple-500/30`} suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScroll>
            <CustomCursor />
            <Noise />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
