import TableComponent from "@/components/table";
import { enterpriseOnDocumentMapper } from "@/mappers/enterpriseOnDocumentMapper";
import { fetchHttpAdapter, type httpClient } from "../../service";
import type { IEnterpriseOnDocumentApi } from "../../types/IEnterpriseOnDocument";

async function getAllCompaniesOnDocuments(httpClient: httpClient<IEnterpriseOnDocumentApi[]>) {
	const data = await httpClient.request({
		url: "/findAllEnterpriseOnDocument",
		method: "get",
	});
	return {
		status: data.statusCode,
		body: enterpriseOnDocumentMapper(data.body),
	};
}

export default async function Home() {
	const companieOnDocuments = await getAllCompaniesOnDocuments(fetchHttpAdapter);

	const columns = [
		{
			key: "enterpriseName",
			label: "Nome",
		},
		{
			key: "enterpriseCNPJ",
			label: "CNPJ",
		},
		{
			key: "documentTitle",
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
		<main className="w-full">
			<h1 className="-mb-6 mt-6 ml-6 font-bold text-3xl">Controle de empresas</h1>
			<div className="m-auto flex h-full w-3/4 items-center justify-center">
				<TableComponent rows={companieOnDocuments.body} columns={columns} />
			</div>
		</main>
	);
}
