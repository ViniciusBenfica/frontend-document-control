import { documentsMapper } from "@/mappers/documentsMapper";
import { fetchHttpAdapter, type httpClient } from "@/service";
import type { IDocumentsApi } from "@/types/IDocuments";
import DocumentForm from "./components/form";

interface Props {
	params: {
		id: string;
	};
}

async function getFindDocument(httpClient: httpClient<IDocumentsApi>, id: string) {
	try {
		const data = await httpClient.request({
			url: `/findDocument/${id}`,
			method: "get",
		});

		return {
			status: data.statusCode,
			body: documentsMapper(data.body),
		};
	} catch (error) {
		return {
			status: 500,
			body: null,
		};
	}
}
export default async function RegisterDocument({ params }: Props) {
	const document = await getFindDocument(fetchHttpAdapter, params.id);

	return (
		<div className="flex w-full flex-col">
			<div className="mt-5 ml-6 flex h-full flex-col gap-3">
				<div>
					<h1 className="text-2xl font-extrabold tracking-tight text-[#020817f6]">
						Gerenciamento de Documentos
					</h1>
					<p className="text-[#64748b] text-sm">Cadastre ou atualize um documento no sistema.</p>
				</div>
				<div className="w-full">
					<DocumentForm document={document.body} />
				</div>
			</div>
		</div>
	);
}
