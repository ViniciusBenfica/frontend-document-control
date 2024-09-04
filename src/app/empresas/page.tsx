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
		<main className="flex w-full flex-col">
			<div className="mt-5 ml-6 flex flex-col gap-3">
				<h1 className="font-bold text-3xl text-gray-700">Controle de empresas</h1>
				<button
					type="button"
					className="w-auto self-start rounded-lg bg-slate-300 p-2 font-semibold duration-100 hover:bg-gray-400"
				>
					Cadastrar empresa
				</button>
			</div>
			<div className="m-auto flex w-3/4 items-center justify-center">
				<TableComponent rows={categories.body} columns={columns} />
			</div>
		</main>
	);
}
