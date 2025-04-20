"use client";

import type { IEnterpriseOnDocument } from "@/types/IEnterpriseOnDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import PDFIcon from "/public/icon/PDF.svg";
import PDFDocument from "./PDFDocument";

interface IProps {
	data: IEnterpriseOnDocument[];
}

export default function PDF({ data }: IProps) {
	return (
		<div>
			<PDFDownloadLink document={<PDFDocument data={data} />} fileName="example.pdf">
				<button
					type="button"
					className="bg-[#0367c8] hover:bg-[#0353a4] p-2 rounded-md text-white text-sm flex items-center gap-2"
				>
					<PDFIcon />
					Download PDF
				</button>
			</PDFDownloadLink>
		</div>
	);
}
