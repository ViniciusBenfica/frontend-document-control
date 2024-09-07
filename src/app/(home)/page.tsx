import TableComponent from "@/components/table";
import { enterpriseOnDocumentMapper } from "@/mappers/enterpriseOnDocumentMapper";
import { fetchHttpAdapter, type httpClient } from "../../service";
import type { IEnterpriseOnDocumentApi } from "../../types/IEnterpriseOnDocument";

function formatDate(dateString: string): string {
	if (!dateString) return "";
	const date = new Date(dateString);
	return date.toLocaleDateString("pt-BR");
}

async function getAllCompaniesOnDocuments(httpClient: httpClient<IEnterpriseOnDocumentApi[]>) {
	const data = await httpClient.request({
		url: "/findAllEnterpriseOnDocument",
		method: "get",
	});
	const response = data.body.map((item) => enterpriseOnDocumentMapper(item));
	return {
		status: data.statusCode,
		body: response,
	};
}

export default async function Home() {
	const companieOnDocuments = await getAllCompaniesOnDocuments(fetchHttpAdapter);

	const companieOnDocumentsWithDate = companieOnDocuments.body.map((companie) => ({
		...companie,
		issueDate: formatDate(companie.issueDate),
		dueDate: formatDate(companie.dueDate),
	}));

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
		<main className="flex w-full flex-col">
			<div className="mt-5 ml-6 flex flex-col gap-3">
				<h1 className="font-bold text-3xl text-gray-700">Controle de vencimento de documento</h1>
			</div>
			<div className="m-auto flex w-3/4 items-center justify-center">
				<TableComponent rows={companieOnDocumentsWithDate} columns={columns} />
			</div>
		</main>
	);
}
