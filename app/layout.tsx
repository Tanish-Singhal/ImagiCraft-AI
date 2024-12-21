import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "./provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ImagiCraft AI - High Quality AI Image Generator | Create Amazing Art",
  description:
    "Create stunning AI-generated images for free. Transform your ideas into beautiful artwork using our powerful AI image generator. No credit card required, instant results.",
  keywords:
    "AI image generator, free AI art, AI artwork creator, image generation, AI art maker, text to image, free image generator",
  authors: [{ name: "ImagiCraft AI" }],
  creator: "ImagiCraft AI",
  publisher: "ImagiCraft AI",
  openGraph: {
    title: "ImagiCraft AI - High Quality AI Image Generator",
    description:
      "Create stunning AI-generated images for free. Transform your ideas into beautiful artwork using our powerful AI image generator.",
    type: "website",
    url: "https://imagicraft-ai.vercel.app",
    siteName: "ImagiCraft AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ImagiCraft AI - High Quality AI Image Generator",
    description: "Create stunning AI-generated images for free with ImagiCraft AI",
  },
  alternates: {
    canonical: "https://imagicraft-ai.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [{ url: "/favicon" }],
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
          <Provider>
            <div className="max-w-7xl mx-auto">
              {children}
              <Toaster position="top-center" reverseOrder={false} />
            </div>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
