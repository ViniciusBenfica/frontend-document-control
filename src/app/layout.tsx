import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Tab from "./(home)/components/Tab";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Controle de documento",
	description: "Aplicaçao para controle de documentos",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<section className="flex">
						<Tab />
						{children}
					</section>
				</Providers>
			</body>
		</html>
	);
}
