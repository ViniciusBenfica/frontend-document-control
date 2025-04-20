"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import CompanyIcon from "/public/icon/company.svg";
import DocumentIcon from "/public/icon/document.svg";
import HomeIcon from "/public/icon/home.svg";
export default function Tab() {
	const pathname = usePathname();

	const isActive = (targetPath: string) => {
		if (targetPath === "/") {
			return pathname === "/" ? "bg-gray-300 font-bold" : "";
		}
		return pathname.startsWith(targetPath) ? "bg-gray-300 font-bold" : "";
	};

	return (
		<div className="flex min-h-screen bg-gray-50">
			<aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
				<nav className="px-3 py-2 space-y-1">
					<Link
						href="/"
						className={classNames(
							"flex items-center px-4 py-2.5 text-sm font-medium rounded-md gap-2",
							isActive("/") ? "bg-[#0354b84b]" : "text-gray-700 hover:bg-gray-100",
						)}
					>
						<HomeIcon />
						Geral
					</Link>
					<Link
						href="/empresas"
						className={classNames(
							"flex items-center px-4 py-2.5 text-sm font-medium rounded-md gap-2",
							isActive("/empresas") ? "bg-[#0354b84b]" : "text-gray-700 hover:bg-gray-100",
						)}
					>
						<CompanyIcon />
						Empresas
					</Link>
					<Link
						href="/documentos"
						className={classNames(
							"flex items-center px-4 py-2.5 text-sm font-medium rounded-md gap-2",
							isActive("/documentos") ? "bg-[#0354b84b]" : "text-gray-700 hover:bg-gray-100",
						)}
					>
						<DocumentIcon className="ml-1" />
						Documentos
					</Link>
				</nav>
			</aside>
		</div>
	);
}
