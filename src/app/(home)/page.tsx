import { fetchHttpAdapter, type httpClient } from "../service";
import type IEnterpriseOnDocument from "../types/IEnterpriseOnDocument";
import TableSection from "./sections/table";

async function getAllCompaniesOnDocuments(httpClient: httpClient<IEnterpriseOnDocument[]>) {
	const data = await httpClient.request({
		url: "/findAllEnterpriseOnDocument",
		method: "get",
	});
	return {
		status: data.statusCode,
		body: data.body,
	};
}

export default async function Home() {
	const companieOnDocuments = await getAllCompaniesOnDocuments(fetchHttpAdapter);

	return (
		<main className="w-full">
			<h1 className="-mb-6 mt-6 ml-6 font-bold text-3xl">Controle de empresas</h1>
			<div className="m-auto flex h-full w-3/4 items-center justify-center">
				<TableSection enterpriseOnDocument={companieOnDocuments.body} />
			</div>
		</main>
	);
}
