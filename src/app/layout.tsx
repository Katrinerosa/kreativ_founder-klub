import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kreativ Founder Klub",
    template: "%s | Kreativ Founder Klub",
  },
  description: "Et fællesskab for kreative founders, der vil skabe stort og stå sammen.",
  icons: {
    icon: "/wolfiefavicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="da"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
