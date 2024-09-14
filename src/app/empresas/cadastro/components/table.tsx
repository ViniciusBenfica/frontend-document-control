"use client";

import TableComponent from "@/components/table";
import type { httpClient } from "@/service";
import type { IEnterprise } from "@/types/IEnterprise";
import { useRouter } from "next/navigation";

interface IProps {
	rows: IEnterprise[];
}

const columns = [
	{
		key: "name",
		label: "Nome",
	},
	{
		key: "cnpj",
		label: "CNPJ",
	},
	{
		key: "edit",
		label: "Editar",
	},
	{
		key: "remove",
		label: "Remover",
	},
];

export default function CompaniesTable({ rows }: IProps) {
	const router = useRouter();
	const deleteEnterprise = async (httpClient: httpClient, id: string) => {
		await httpClient.request({
			url: `/deleteEnterprise/${id}`,
			method: "delete",
		});
		router.refresh();
	};

	return (
		<TableComponent
			rows={rows}
			columns={columns}
			path={"empresas"}
			deleteFunction={deleteEnterprise}
		/>
	);
}
