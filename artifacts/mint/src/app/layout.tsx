import type { Metadata } from "next";
import { Asap } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ToastProvider } from "@/components/ui/toast";
import { Header } from "@/components/header";
import { ThirdwebProvider } from "thirdweb/react";

const asap = Asap({ subsets: ["latin"] });

export const metadata: Metadata = {
        title: "Gianky NFT",
        description: "Mint Gianky NFTs on Polygon",
};

export default function RootLayout({
        children,
}: Readonly<{
        children: React.ReactNode;
}>) {
        return (
                <html lang="en">
                        <body className={asap.className}>
                                {/* Back to main site */}
                                <a
                                        href="/"
                                        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 text-white/70 backdrop-blur-sm border border-white/20 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all duration-300 text-xs font-medium uppercase tracking-wider"
                                >
                                        ← Home
                                </a>
                                <ThirdwebProvider>
                                        <ToastProvider>
                                                <Toaster position="bottom-center" />
                                                <Header />
                                                {children}
                                        </ToastProvider>
                                </ThirdwebProvider>
                        </body>
                </html>
        );
}
