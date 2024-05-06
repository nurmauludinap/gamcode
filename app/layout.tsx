import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import "./globals.css";
import { PracticeModal } from "@/components/modals/practice-modal";

const font = Poppins({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  title: "GamCode",
  description: "Created by GamCode Developer",
  icons: {
    icon: [
      {
        url: '/logo_gamcode_transparent.svg',
        href: '/logo_gamcode_transparent.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <Toaster/>
          <ExitModal/>
          <HeartsModal/>
          <PracticeModal/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
