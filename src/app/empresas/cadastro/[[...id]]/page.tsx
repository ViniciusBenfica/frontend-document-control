import { documentsMapper } from "@/mappers/documentsMapper";
import { enterpriseMapper } from "@/mappers/enterpriseMapper";
import { fetchHttpAdapter, type httpClient } from "@/service";
import type { IDocumentsApi } from "@/types/IDocuments";
import type { IEnterpriseApi } from "@/types/IEnterprise";
import FormContextcompany from "./components/formContext";

interface Props {
	params: {
		id: string;
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

async function getFindEnterprise(httpClient: httpClient<IEnterpriseApi>, id: string) {
	const data = await httpClient.request({
		url: `/findEnterprise/${id}`,
		method: "get",
	});

	return {
		status: data.statusCode,
		body: enterpriseMapper(data.body),
	};
}

export default async function RegisterCompanies({ params }: Props) {
	const documents = await getFindAllDocuments(fetchHttpAdapter);
	const enterPrise = await getFindEnterprise(fetchHttpAdapter, params.id);

	return (
		<div className="flex w-full flex-col">
			<div className="mt-5 ml-6 flex h-full flex-col gap-3">
				<div>
					<h1 className="text-2xl font-extrabold tracking-tight text-[#020817f6]">
						Gerenciamento de empresa
					</h1>
					<p className="text-[#64748b] text-sm">Cadastre ou atualize uma empresa no sistema.</p>
				</div>
				<div className="w-full">
					<FormContextcompany documents={documents.body} enterPrise={enterPrise.body} />
				</div>
			</div>
		</div>
	);
}
