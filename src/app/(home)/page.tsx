import { enterpriseOnDocumentMapper } from "@/mappers/enterpriseOnDocumentMapper";
import { fetchHttpAdapter, type httpClient } from "../../service";
import type { IEnterpriseOnDocumentApi } from "../../types/IEnterpriseOnDocument";
import HomeTable from "./components/table";

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

	return (
		<main className="flex w-full flex-col p-6">
			<div className="flex flex-col gap-3">
				<h1 className="font-bold text-3xl text-gray-700">
					Visualização de Vencimento de Documentos
				</h1>
			</div>
			<div className="m-auto w-full items-center justify-center">
				<HomeTable rows={companieOnDocuments.body} />
			</div>
		</main>
	);
}
