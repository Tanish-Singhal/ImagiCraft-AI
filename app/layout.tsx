import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ImagiCraft AI - Free High Quality AI Image Generator | Create Amazing Art",
  description: "Create stunning AI-generated images for free. Transform your ideas into beautiful artwork using our powerful AI image generator. No credit card required, instant results.",
  keywords: "AI image generator, free AI art, AI artwork creator, image generation, AI art maker, text to image, free image generator",
  authors: [{ name: "ImagiCraft AI" }],
  creator: "ImagiCraft AI",
  publisher: "ImagiCraft AI",
  openGraph: {
    title: "ImagiCraft AI - Free High Quality AI Image Generator",
    description: "Create stunning AI-generated images for free. Transform your ideas into beautiful artwork using our powerful AI image generator.",
    type: "website",
    url: "https://imagicraft-ai.com",
    siteName: "ImagiCraft AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ImagiCraft AI - Free High Quality AI Image Generator",
    description: "Create stunning AI-generated images for free with ImagiCraft AI",
  },
  alternates: {
    canonical: "https://imagicraft-ai.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
