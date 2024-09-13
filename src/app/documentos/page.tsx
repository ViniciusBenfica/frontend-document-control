import TableComponent from "@/components/table";
import { documentsMapper } from "@/mappers/documentsMapper";
import Link from "next/link";
import { fetchHttpAdapter, type httpClient } from "../../service";
import type { IDocumentsApi } from "../../types/IDocuments";

async function getAllDocuments(httpClient: httpClient<IDocumentsApi[]>) {
	const data = await httpClient.request({
		url: "/findAllDocument",
		method: "get",
	});
	const response = data.body.map((item) => documentsMapper(item));
	return {
		status: data.statusCode,
		body: response,
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
		<main className="flex w-full flex-col p-6">
			<div className="flex flex-col gap-3">
				<h1 className="font-bold text-3xl text-gray-700">Controle de documentos</h1>
				<Link
					href="/documentos/cadastro"
					className="w-auto self-start rounded-lg bg-slate-300 p-2 font-semibold duration-100 hover:bg-gray-400"
				>
					Cadastrar Documento
				</Link>
			</div>
			<div className="m-auto w-full items-center justify-center">
				<TableComponent rows={documents.body} columns={columns} path={"documentos"} />
			</div>
		</main>
	);
}
