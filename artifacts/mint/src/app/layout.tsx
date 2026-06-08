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
