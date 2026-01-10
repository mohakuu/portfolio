import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
  title: {
    template: "%s | Portfolio",
    default: "Portfolio",
  },
  description:
    "山梨出身のWebエンジニアのポートフォリオサイト。フロントエンドからバックエンドまで、幅広い技術スタックでWebアプリケーションの開発を行っています。",
  openGraph: {
    title: {
      template: "%s | Portfolio",
      default: "Portfolio",
    },
    description:
      "山梨出身のWebエンジニアのポートフォリオサイト。フロントエンドからバックエンドまで、幅広い技術スタックでWebアプリケーションの開発を行っています。",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen bg-white dark:bg-gray-900">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
