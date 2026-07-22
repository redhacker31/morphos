import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "MorphOS | Describe. Generate. Evolve.",
  description:
    "AI-powered application generation platform. Describe your workflow in natural language and MorphOS generates a complete, collaborative application instantly.",
  keywords: ["AI", "application generator", "no-code", "MorphOS", "workspace"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
