import TableComponent from "@/components/table";
import { enterpriseOnDocumentMapper } from "@/mappers/enterpriseOnDocumentMapper";
import { fetchHttpAdapter, type httpClient } from "../../service";
import type { IEnterpriseOnDocumentApi } from "../../types/IEnterpriseOnDocument";

function formatDate(dateValue: string | Date): string {
	if (!dateValue) return "";
	const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
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

	// const today = new Date();
	// const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

	// const companieOnDocumentsWithDate = companieOnDocuments.body
	// 	.map((companie) => ({
	// 		...companie,
	// 		issueDate: new Date(companie.issueDate),
	// 		dueDate: new Date(companie.dueDate),
	// 	}))
	// 	.filter((companie) => {
	// 		return companie.dueDate >= sevenDaysAgo && companie.dueDate <= today;
	// 	})
	// 	.map((companie) => ({
	// 		...companie,
	// 		issueDate: formatDate(companie.issueDate),
	// 		dueDate: formatDate(companie.dueDate),
	// 	}));

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

	return (
		<main className="flex w-full flex-col p-6">
			<div className="flex flex-col gap-3">
				<h1 className="font-bold text-3xl text-gray-700">
					Visualização de Vencimento de Documentos
				</h1>
			</div>
			<div className="m-auto w-full items-center justify-center">
				<TableComponent rows={companieOnDocumentsWithDate} columns={columns} />
			</div>
		</main>
	);
}
