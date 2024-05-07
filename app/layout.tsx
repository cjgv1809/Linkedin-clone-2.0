import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linkedin Clone",
  description: "Linkedin Clone built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          {/* Toaster*/}
          <Toaster position="bottom-right" />

          <header className="border-b sticky top-0 bg-white z-50">
            <Header />
          </header>

          <div className="flex-1 w-full bg-[#F4F2ED]">
            <main className="mx-auto max-w-6xl">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
