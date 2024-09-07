import { documentsMapper } from "@/mappers/documentsMapper";
import { enterpriseOnDocumentMapper } from "@/mappers/enterpriseOnDocumentMapper";
import { fetchHttpAdapter, type httpClient } from "@/service";
import type { IDocumentsApi } from "@/types/IDocuments";
import type { IEnterpriseOnDocumentApi } from "@/types/IEnterpriseOnDocument";
import FormContextcompany from "../components/formContext";

interface Props {
	params: {
		id: string;
	};
}

async function getFindEnterpriseOnDocument(
	httpClient: httpClient<IEnterpriseOnDocumentApi[]>,
	id: string,
) {
	const data = await httpClient.request({
		url: `/findEnterpriseOnDocument?enterpriseId=${id}`,
		method: "get",
	});

	const result = data.body.map((item) => enterpriseOnDocumentMapper(item));

	return {
		status: data.statusCode,
		body: result,
	};
}

async function getFindAllDocuments(httpClient: httpClient<IDocumentsApi[]>) {
	const data = await httpClient.request({
		url: "/findAllDocument",
		method: "get",
	});

	const result = data.body.map((item) => documentsMapper(item));

	return {
		status: data.statusCode,
		body: result,
	};
}

export default async function RegisterCompanies({ params }: Props) {
	const categories = await getFindEnterpriseOnDocument(fetchHttpAdapter, params.id);
	const documents = await getFindAllDocuments(fetchHttpAdapter);

	return (
		<div className="flex w-full flex-col">
			<div className="mt-5 ml-6 flex flex-col gap-3">
				<h1 className="font-bold text-3xl text-gray-700">Cadastro de empresa</h1>
				<FormContextcompany enterpriseOnDocument={categories.body} documents={documents.body} />
			</div>
		</div>
	);
}
