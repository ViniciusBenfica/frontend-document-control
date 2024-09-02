import { fetchHttpAdapter, type httpClient } from "../service";
import type IEnterprise from "../types/IEnterprise";
import TableSection from "./sections/table";

async function getAllCompanies(httpClient: httpClient<IEnterprise[]>) {
	const data = await httpClient.request({
		url: "/findAll",
		method: "get",
	});
	return {
		status: data.statusCode,
		body: data.body,
	};
}

export default async function Companies() {
	const categories = await getAllCompanies(fetchHttpAdapter);

	return (
		<main className="w-full">
			<h1 className="-mb-6 mt-6 ml-6 font-bold text-3xl">Controle de empresas</h1>
			<div className="m-auto flex h-full w-3/4 items-center justify-center">
				<TableSection categories={categories.body} />
			</div>
		</main>
	);
}
