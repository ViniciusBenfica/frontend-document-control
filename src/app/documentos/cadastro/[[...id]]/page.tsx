import { documentsMapper } from "@/mappers/documentsMapper";
import { fetchHttpAdapter, type httpClient } from "@/service";
import type { IDocumentsApi } from "@/types/IDocuments";
import RegisterDocumentForm from "../components/form";

interface Props {
	params: {
		id: string;
	};
}

async function getFindDocument(httpClient: httpClient<IDocumentsApi>, id: string) {
	const data = await httpClient.request({
		url: `/findDocument/${id}`,
		method: "get",
	});

	return {
		status: data.statusCode,
		body: documentsMapper(data.body),
	};
}

export default async function RegisterDocument({ params }: Props) {
	const document = await getFindDocument(fetchHttpAdapter, params.id);

	return (
		<div className="flex w-full flex-col">
			<div className="mt-5 ml-6 flex h-full flex-col gap-3">
				<h1 className="font-bold text-3xl text-gray-700">Cadastro de documento</h1>
				<div className="m-auto w-full">
					<RegisterDocumentForm document={document.body} />
				</div>
			</div>
		</div>
	);
}
