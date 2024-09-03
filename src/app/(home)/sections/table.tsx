"use client";

import TableComponent from "@/app/components/table";
import type IEnterpriseOnDocument from "@/app/types/IEnterpriseOnDocument";

interface IProps {
	enterpriseOnDocument: IEnterpriseOnDocument[];
}

export default async function TableSection({ enterpriseOnDocument }: IProps) {
	const rows = enterpriseOnDocument?.map((enterpriseOnDocument) => ({
		key: enterpriseOnDocument.id,
		enterprise: enterpriseOnDocument.enterprise.name,
		cnpj: enterpriseOnDocument.enterprise.cnpj,
		document: enterpriseOnDocument.document.title,
		issueDate: enterpriseOnDocument.issueDate,
		dueDate: enterpriseOnDocument.dueDate,
	}));

	const columns = [
		{
			key: "enterprise",
			label: "Nome",
		},
		{
			key: "cnpj",
			label: "CNPJ",
		},
		{
			key: "document",
			label: "Documento",
		},
		{
			key: "issueDate",
			label: "Data de emissão",
		},
		{
			key: "dueDate",
			label: "Data de vencimento",
		},
	];

	return (
		<div className="flex h-full w-full items-center justify-center">
			<TableComponent rows={rows} columns={columns} />
		</div>
	);
}
