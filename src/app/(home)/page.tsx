import { enterpriseOnDocumentMapper } from "@/mappers/enterpriseOnDocumentMapper";
import { fetchHttpAdapter, type httpClient } from "../../service";
import type { IEnterpriseOnDocumentApi } from "../../types/IEnterpriseOnDocument";
import HomeTable from "./components/table";

async function getAllCompaniesOnDocuments(httpClient: httpClient<IEnterpriseOnDocumentApi[]>) {
	try {
		const data = await httpClient.request({
			url: "/findAllEnterpriseOnDocument",
			method: "get",
		});
		const response = data.body.map((item) => enterpriseOnDocumentMapper(item));
		return {
			status: data.statusCode,
			body: response,
		};
	} catch (error) {
		console.log(error);
		return {
			status: 500,
			body: [],
		};
	}
}

export default async function Home() {
	const companieOnDocuments = await getAllCompaniesOnDocuments(fetchHttpAdapter);

	return (
		<main className="flex w-full flex-col p-6">
			<div>
				<h1 className="text-2xl font-extrabold tracking-tight text-[#020817f6]">Painel Geral</h1>
				<p className="text-[#64748b] text-sm">
					Visualize as associações entre documentos e empresas.
				</p>
			</div>
			<div className="m-auto w-full items-center justify-center">
				<HomeTable rows={companieOnDocuments.body} />
			</div>
		</main>
	);
}
