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

	// const today = new Date();

	// const companieOnDocumentsWithDate = companieOnDocuments.body
	// 	.map((companie) => ({
	// 		...companie,
	// 		issueDate: new Date(companie.issueDate),
	// 		dueDate: new Date(companie.dueDate),
	// 	}))
	// 	.filter((companie) => {
	// 		const timeDiff = companie.dueDate.getTime() - today.getTime();

	// 		const daysToDue = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

	// 		return daysToDue === 7;
	// 	});

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
