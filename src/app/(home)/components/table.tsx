"use client";

import TableComponent, { type IFilter } from "@/components/table";
import { enterpriseOnDocumentMapper } from "@/mappers/enterpriseOnDocumentMapper";
import type { httpClient } from "@/service";
import type {
	IEnterpriseOnDocument,
	IEnterpriseOnDocumentApi,
} from "@/types/IEnterpriseOnDocument";
import dynamic from "next/dynamic";
import { useState } from "react";
const PDF = dynamic(() => import("./PDF/PDF"), { ssr: false });

interface IProps {
	rows: IEnterpriseOnDocument[];
}

const columns = [
	{
		key: "enterpriseName",
		label: "Nome",
		sortable: true,
	},
	{
		key: "enterpriseCNPJ",
		label: "CNPJ",
	},
	{
		key: "documentTitle",
		label: "Documento",
		sortable: true,
	},
	{
		key: "issueDate",
		label: "Data de emissão",
		sortable: true,
	},
	{
		key: "dueDate",
		label: "Data de vencimento",
		sortable: true,
	},
];

export default function HomeTable({ rows }: IProps) {
	const [filterData, setFilterData] = useState<IEnterpriseOnDocument[]>(rows);

	const filterEnterpriseOnDocument = async (
		httpClient: httpClient<IEnterpriseOnDocumentApi[]>,
		value: IFilter,
	) => {
		const data = await httpClient.request({
			url: "/findAllEnterpriseOnDocument",
			method: "get",
			params: {
				name: value?.text,
				cnpj: value?.text,
				title: value?.text,
				issueDate: value?.date?.start,
				dueDate: value?.date?.end,
			},
		});

		setFilterData(data.body.map((item) => enterpriseOnDocumentMapper(item)));
	};

	return (
		<div>
			<TableComponent
				rows={filterData}
				columns={columns}
				path={"documentos"}
				downloadButton={<PDF data={filterData} />}
				filterFunction={filterEnterpriseOnDocument}
			/>
		</div>
	);
}
