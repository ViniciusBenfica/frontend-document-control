import TableComponent from "@/components/table";
import { documentsMapper } from "@/mappers/documentsMapper";
import { fetchHttpAdapter, type httpClient } from "../service";
import type { IDocumentsApi } from "../types/IDocuments";

async function getAllDocuments(httpClient: httpClient<IDocumentsApi[]>) {
	const data = await httpClient.request({
		url: "/findAllDocument",
		method: "get",
	});
	return {
		status: data.statusCode,
		body: documentsMapper(data.body),
	};
}

export default async function Documents() {
	const documents = await getAllDocuments(fetchHttpAdapter);

	const columns = [
		{
			key: "title",
			label: "Título",
		},
		{
			key: "description",
			label: "Descrição",
		},
	];

	return (
		<main className="w-full">
			<h1 className="-mb-6 mt-6 ml-6 font-bold text-3xl">Controle de empresas</h1>
			<div className="m-auto flex h-full w-3/4 items-center justify-center">
				<TableComponent rows={documents.body} columns={columns} />
			</div>
		</main>
	);
}
