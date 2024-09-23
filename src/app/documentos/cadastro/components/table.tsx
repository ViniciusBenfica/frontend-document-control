"use client";

import TableComponent from "@/components/table";
import type { httpClient } from "@/service";
import type { IDocuments } from "@/types/IDocuments";
import { useRouter } from "next/navigation";

interface IProps {
	rows: IDocuments[];
}

const columns = [
	{
		key: "title",
		label: "Título",
		sortable: true,
	},
	{
		key: "description",
		label: "Descrição",
		sortable: true,
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

export default function DocumentsTable({ rows }: IProps) {
	const router = useRouter();
	const deleteDocument = async (httpClient: httpClient, id: string) => {
		await httpClient.request({
			url: `/deleteDocument/${id}`,
			method: "delete",
		});
		router.refresh();
	};

	return (
		<TableComponent
			rows={rows}
			columns={columns}
			path={"documentos"}
			deleteFunction={deleteDocument}
		/>
	);
}
