"use client";

import TableComponent from "@/components/table";
import { enterpriseOnDocumentMapper } from "@/mappers/enterpriseOnDocumentMapper";
import type { httpClient } from "@/service";
import type {
	IEnterpriseOnDocument,
	IEnterpriseOnDocumentApi,
} from "@/types/IEnterpriseOnDocument";
import { useState } from "react";
import PDF from "./PDF/PDF";

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
		value: string,
	) => {
		const data = await httpClient.request({
			url: "/findAllEnterpriseOnDocument",
			method: "get",
			params: {
				name: value,
				cnpj: value,
				title: value,
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
