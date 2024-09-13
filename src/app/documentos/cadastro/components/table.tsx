"use client";

import TableComponent from "@/components/table";
import type { httpClient } from "@/service";
import type { IDocuments } from "@/types/IDocuments";
import { useRouter } from "next/navigation";

interface IProps {
	rows: IDocuments[];
}

export default function DocumentsTable({ rows }: IProps) {
	const router = useRouter();
	const deleteDocument = async (httpClient: httpClient, id: string) => {
		await httpClient.request({
			url: `/deleteDocument/${id}`,
			method: "delete",
		});
		router.refresh();
	};

	const columns = [
		{
			key: "title",
			label: "Título",
		},
		{
			key: "description",
			label: "Descrição",
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

	return (
		<TableComponent
			rows={rows}
			columns={columns}
			path={"documentos"}
			deleteFunction={deleteDocument}
		/>
	);
}
