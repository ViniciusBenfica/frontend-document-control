import { documentsMapper } from "@/mappers/documentsMapper";
import Link from "next/link";
import { fetchHttpAdapter, type httpClient } from "../../service";
import type { IDocumentsApi } from "../../types/IDocuments";
import DocumentsTable from "./cadastro/components/table";
import PlusIcon from "/public/icon/plus.svg"

async function getAllDocuments(httpClient: httpClient<IDocumentsApi[]>) {
	try {
		const data = await httpClient.request({
			url: "/findAllDocument",
			method: "get",
	});
	const response = data.body.map((item) => documentsMapper(item));
	return {
			status: data.statusCode,
			body: response,
		};
	} catch (error) {
		return {
			status: 500,
			body: [],
		};
	}
}

export default async function Documents() {
	const documents = await getAllDocuments(fetchHttpAdapter);

	return (
		<main className="flex w-full flex-col p-6">
			<div className="flex justify-between items-center mb-6">
        <div>
				<h1 className="text-2xl font-extrabold tracking-tight text-[#020817f6]">Documentos</h1>
				<p className="text-[#64748b] text-sm">
					Gerencie os documentos disponíveis no sistema.
				</p>
        </div>
        <Link href="/documentos/cadastro">
          <button className="bg-[#0367c8] hover:bg-[#0353a4] p-2 rounded-md text-white text-sm flex items-center gap-2">
						<PlusIcon/>
             Novo Documento
          </button>
        </Link>
      </div>
			<div className="m-auto w-full items-center justify-center">
				<DocumentsTable rows={documents.body} />
			</div>
		</main>
	);
}
