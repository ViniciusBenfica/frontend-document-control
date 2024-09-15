"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tab() {
	const pathname = usePathname();

	const isActive = (targetPath: string) => {
		return pathname === targetPath ? "bg-gray-300 font-bold" : "";
	};

	return (
		<section className="flex">
			<div className="h-screen w-[220px] shadow-[0_4px_10px_rgba(0,0,0,0.65)]">
				<nav>
					<ul>
						<Link
							href={"/"}
							className={`flex h-[50px] w-full items-center justify-center transition-colors duration-50 hover:bg-gray-300 ${isActive(
								"/",
							)}`}
						>
							Geral
						</Link>
						<Link
							href={"/empresas"}
							className={`flex h-[50px] w-full items-center justify-center transition-colors duration-50 hover:bg-gray-300 ${isActive(
								"/empresas",
							)}`}
						>
							Empresas
						</Link>
						<Link
							href={"/documentos"}
							className={`flex h-[50px] w-full items-center justify-center transition-colors duration-50 hover:bg-gray-300 ${isActive(
								"/documentos",
							)}`}
						>
							Documentos
						</Link>
					</ul>
				</nav>
			</div>
		</section>
	);
}
