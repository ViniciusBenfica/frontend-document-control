"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CompanyIcon from "/public/icon/companyIcon.svg";
import DateIcon from "/public/icon/dateIcon.svg";
import DocumentIcon from "/public/icon/documentIcon.svg";

export default function Tab() {
	const pathname = usePathname();

	const isActive = (targetPath: string) => {
		if (targetPath === "/") {
			return pathname === "/" ? "bg-gray-300 font-bold" : "";
		}
		return pathname.startsWith(targetPath) ? "bg-gray-300 font-bold" : "";
	};

	return (
		<section className="flex">
			<div className="h-screen w-[200px] shadow-[0_4px_10px_rgba(0,0,0,0.65)]">
				<nav>
					<ul>
						<Link
							href={"/"}
							className={`flex h-[50px] w-full items-center justify-center transition-colors duration-50 hover:bg-gray-300 ${isActive(
								"/",
							)}`}
						>
							<div className="flex gap-3 items-center w-[150px]">
								<DateIcon/>
								Geral
							</div>
						</Link>
						<Link
							href={"/empresas"}
							className={`flex h-[50px] w-full items-center justify-center transition-colors duration-50 hover:bg-gray-300 ${isActive(
								"/empresas",
							)}`}
						>
							
							<div className="flex gap-3 items-center w-[150px]">
								<CompanyIcon className="-ml-[2px]"/>
								Empresas
							</div>
						</Link>
						<Link
							href={"/documentos"}
							className={`flex h-[50px] w-full items-center justify-center transition-colors duration-50 hover:bg-gray-300 ${isActive(
								"/documentos",
							)}`}
						>
							<div className="flex gap-3 items-center w-[150px]">
								<DocumentIcon/>
								Documentos
							</div>
						</Link>
					</ul>
				</nav>
			</div>
		</section>
	);
}
