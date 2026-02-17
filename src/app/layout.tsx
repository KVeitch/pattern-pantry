import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import MuiThemeProvider from "./MuiThemeProvider";
import AppLayout from "@/components/AppLayout";
import PwaRegister from "@/components/PwaRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const viewport = {
  themeColor: "#1976d2",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Pattern Pantry – Sewing & Cosplay Pattern Manager",
  description: "Track your sewing patterns, fabrics, and pattern covers.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pattern Pantry",
  },
  formatDetection: {
    telephone: false,
    email: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${roboto.className} antialiased`}
      >
        <MuiThemeProvider>
          <PwaRegister />
          <AppLayout>{children}</AppLayout>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
