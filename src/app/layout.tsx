import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import { getTagList } from "@/features/blog/api/get-tags";
import { LIMIT } from "@/libs/constants";

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
    template: "%s | Simple Blog",
    default: "Simple Blog",
  },
  description: "A simple blog presented by microCMS",
  openGraph: {
    title: {
      template: "%s | Simple Blog",
      default: "Simple Blog",
    },
    description: "A simple blog presented by microCMS",
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tags = await getTagList({
    limit: LIMIT,
  });
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <Nav tags={tags.contents} />
        <main className="min-h-screen bg-white dark:bg-gray-900">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
