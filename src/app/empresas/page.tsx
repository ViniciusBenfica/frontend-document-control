import TableComponent from "@/components/table";
import { enterpriseMapper } from "@/mappers/enterpriseMapper";
import { fetchHttpAdapter, type httpClient } from "../../service";
import type { IEnterpriseApi } from "../../types/IEnterprise";

async function getAllCompanies(httpClient: httpClient<IEnterpriseApi[]>) {
	const data = await httpClient.request({
		url: "/findAllEnterprise",
		method: "get",
	});
	return {
		status: data.statusCode,
		body: enterpriseMapper(data.body),
	};
}

export default async function Companies() {
	const categories = await getAllCompanies(fetchHttpAdapter);

	const columns = [
		{
			key: "nome",
			label: "NAME",
		},
		{
			key: "cnpj",
			label: "CNPJ",
		},
	];

	return (
		<main className="w-full">
			<h1 className="-mb-6 mt-6 ml-6 font-bold text-3xl">Controle de empresas</h1>
			<div className="m-auto flex h-full w-3/4 items-center justify-center">
				<TableComponent rows={categories.body} columns={columns} />
			</div>
		</main>
	);
}
