"use client";

import type { IEnterpriseOnDocument } from "@/types/IEnterpriseOnDocument";
import dynamic from "next/dynamic";
import React from "react";
import PDFDocument from "./PDFDocument";

const PDFDownloadLink = dynamic(
	() => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
	{
		ssr: false,
	},
);

interface IProps {
	data: IEnterpriseOnDocument[];
}

export default function PDF({ data }: IProps) {
	return (
		<div>
			<PDFDownloadLink document={<PDFDocument data={data} />} fileName="example.pdf">
				<button
					type="button"
					className="w-[150px] rounded-lg bg-slate-300 p-2 font-semibold duration-100 hover:bg-gray-400"
				>
					Download PDF
				</button>
			</PDFDownloadLink>
		</div>
	);
}
