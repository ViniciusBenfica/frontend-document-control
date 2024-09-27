"use client";

import TableComponent from "@/components/table";
import { enterpriseOnDocumentMapper } from "@/mappers/enterpriseOnDocumentMapper";
import type { httpClient } from "@/service";
import type {
	IEnterpriseOnDocument,
	IEnterpriseOnDocumentApi,
} from "@/types/IEnterpriseOnDocument";

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

		const response = data.body.map((item) => enterpriseOnDocumentMapper(item));
		return response;
	};

	return (
		<TableComponent
			rows={rows}
			columns={columns}
			path={"documentos"}
			filterFunction={filterEnterpriseOnDocument}
		/>
	);
}
