import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hospital Management",
  description: "Unburden nurses and patient's family even if its little",
  icons: "https://og-image.vercel.app/**Hospital%20Management**.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fcdn.discordapp.com%2Fattachments%2F877977037323765524%2F878000920879917588%2Fimage.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}
      className={inter.className}>{children}</body>
    </html>
  );
}
